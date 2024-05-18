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
    socket.on('chat message',msg=>{
      io.emit('chat message',msg)
      console.log("a new user connected",msg)
    })  
    socket.on('typing',()=>{
      socket.broadcast.emit('typing')
    })
})

server.listen(9000,()=>{console.log("listening to server 9000")})   