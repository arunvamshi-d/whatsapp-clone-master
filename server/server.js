//imports
import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import Messages from './dbMessages.js'
import Pusher from 'pusher'


//app config
const app = express()
const port = process.env.PORT || 9000
const connection_url = 'mongodb+srv://user:user@cluster0.sig6g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const pusher = new Pusher({
    appId: "1345169",
    key: "2bc821577ef09e056300",
    secret: "2572b94c0b53f52f2905",
    cluster: "ap2",
    useTLS: true
  });


//middleware
app.use(express.json())
app.use(Cors())

//DB config
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

//api routes
const db = mongoose.connection
db.once("open",()=>{
    console.log("DB Connected")
    const msgCollection = db.collection("whatsappmessages")
    const ChangeStream = msgCollection.watch()

    ChangeStream.on('change',change=>{
        console.log(change)

        if(change.operationType === "insert") {
            const messageDetails = change.fullDocument
            pusher.trigger("messages","inserted",{
                name:messageDetails.name,
                message:messageDetails.message,
                timestamp:messageDetails.timestamp,
                received:messageDetails.received,
            })
        } else {
            console.log('Error triggering Pusher')
        }
    })
})
app.get("/",(req,res)=>res.status(200).send("whatsapp-clone"))

app.get('/messages/sync',(req,res)=>{
   Messages.find((err,data)=>{
        if(err)
        res.status(500).send(err)
        else
        res.status(200).send(data)
    })
})

app.post('/messages/new',(req,res)=>{
    const dbMessage = req.body
    Messages.create(dbMessage,(err,data)=>{
        if(err)
        res.status(500).send(err)
        else
        res.status(201).send(data)
    })
})


//listen
app.listen(port,()=> console.log(`Listening on localhost: ${port} `))