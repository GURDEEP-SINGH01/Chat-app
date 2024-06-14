const express = require("express");
const routes = express.Router();   
const userController=require('../Controller/UserController')
const messageController=require('../Controller/MessagesController')

routes.post('/addUser',userController.addUser)
routes.post('/signIn',userController.signIn)
routes.get('/allUsers',userController.allUsers)

routes.post('/getMessage',messageController.getMessage)
routes.post('/addMessage',messageController.addMessage)
routes.post('/deleteMessage',messageController.findlast)

module.exports = routes;