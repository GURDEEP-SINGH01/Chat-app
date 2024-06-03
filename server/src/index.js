const express= require('express');
const http=require('http');
const {Server}=require('socket.io')
const mongoose=require('mongoose')
const cors = require('cors');
const routes=require('./Routes/Routes');
const app = express();
const server=http.createServer(app); 
const { instrument } = require('@socket.io/admin-ui');


app.use(cors());
app.use(express.json());
// mongoose.connect(
// 'mongodb+srv://gurdeepsingh1431999:Ht38PSMKrxxR6Tw0@chat-cluster.ale2rkh.mongodb.net/?retryWrites=true&w=majority&appName=chat-cluster');
// const db=mongoose.connection;
// db.on("error", (err) => {
//   console.log("Error occured while connecting " + err);
// });
// db.once("open", () => {
//   console.log("Connection made with Db");
// });
mongoose.connect('mongodb://127.0.0.1:27017/chatApp').then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

const io=new Server(server,{
  cors: {
    origin:["http://localhost:3000","https://admin.socket.io"],  
    methods: ["GET", "POST"],credentials: true
  }
})
let users = {};
io.on('connection',(socket)=>{ 
  // Add user to the users object
    socket.on('addUser', userId => {
      users[userId] = socket.id;
      io.emit('getUsers', users);
    });
    // Send and receive messages
    socket.on('sendMessage', ({ senderId, receiverId, message }) => {
        const receiverSocketId = users[receiverId];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('getMessage', {
                senderId,
                message
            });
        }
    });
})
app.use('/chatapp',routes)

server.listen(9000,()=>{console.log("listening to server 9000")})   


instrument(io, {
  auth: false,
});