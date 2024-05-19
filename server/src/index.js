const express= require('express');
const http=require('http');
const {Server}=require('socket.io')
const mongoose=require('mongoose')
const cors = require('cors');
const routes=require('./Routes/Routes')

const app = express();
const server=http.createServer(app); 
app.use(express.json());
app.use(cors());
// mongoose.connect(
// 'mongodb+srv://gurdeepsingh1431999:Ht38PSMKrxxR6Tw0@chat-cluster.ale2rkh.mongodb.net/?retryWrites=true&w=majority&appName=chat-cluster');
// const db=mongoose.connection;
// db.on("error", (err) => {
//   console.log("Error occured while connecting " + err);
// });
// db.once("open", () => {
//   console.log("Connection made with Db");
// });
mongoose.connect('mongodb://127.0.0.1:27017/chatApp')
 const db=mongoose.connection;
db.on("error", (err) => {
  console.log("Error occured while connecting " + err);
});
db.once("open", () => {
  console.log("Connection made with Db");
});
const io=new Server(server,{
  cors: {
    origin: "http://localhost:3000",  
    methods: ["GET", "POST"]
  }
})

app.use('/chatapp',routes)

io.on("connection",(socket)=>{
    socket.on('chat message',(msgdata)=>{
      // Assuming recipientId is the unique identifier of the recipient user]
      console.log('messagedata',msgdata.recipientId,msgdata.message)
      socket.to(msgdata.recipientId).emit('chat message',{ from: msgdata.senderId, message: msgdata.message })
    })  
    socket.on('typing',(recipientId)=>{
      console.log(recipientId,'typing')
      socket.to(recipientId).emit('typing')
    })
    
    // Joining a room with a unique identifier for each user
    socket.on('join', (userId) => {
        socket.join(userId);
        console.log("User joined room", userId);
    });

     // Leaving the room when disconnected
    socket.on('disconnect', () => {
        socket.leaveAll(); // Leave all rooms
        console.log("User disconnected");
    });
})

server.listen(9000,()=>{console.log("listening to server 9000")})   