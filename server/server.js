// * importing 
import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Pusher from 'pusher';
import cors from 'cors';
import dotenv from "dotenv"
//* app config
const app = express();
dotenv.config();
const port = 9000;
const pusher = new Pusher({
	appId: process.env.PUSHER_APP_ID,
	key: process.env.PUSHER_KEY,
	secret: process.env.PUSHER_SECRET,
	cluster: "ap2",
	useTLS: true,
});
//* middleware
app.use(express.json());
app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Headers', '*');
//   next();
// })

//* DB config
const connection_url = process.env.MONGO_URL;
const dbName = "whatsappdb";
mongoose.connect(connection_url, {
  dbName: dbName,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db=mongoose.connection;
db.once('open',()=>{
  console.log("DB connected");
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();
  changeStream.on('change',(change)=>{
    console.log(change);
    if(change.operationType === 'insert'){
      const messageDetails = change.fullDocument;
      pusher.trigger('messages','inserted',{
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        received: messageDetails.received
      }); 
    } else {
      console.log('Error triggering pusher');
    }
  })
})

//* api routes
app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.get('/messages/sync', async (req, res) => {
  try {
    const messages = await Messages.find({});
    res.status(200).send(messages);
  } catch (error) {
    res.status(500).send(error);
  }
})

app.post("/messages/new", async (req, res) => {
  try {
    const dbMessage = req.body;
    const createdMessage= await Messages.create(dbMessage);
    res.status(201).send(createdMessage);
  } catch (err) {
    req.status(500).send(err);
  }

})

//* listen
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})