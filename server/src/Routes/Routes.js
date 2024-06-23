const express = require("express");
const routes = express.Router();   
const userController=require('../Controller/UserController')
const messageController=require('../Controller/MessagesController')
const friendsController=require('../Controller/FriendsController')

routes.post('/signIn',userController.signIn)
routes.post('/signUp',userController.signUp)
routes.get('/search/:getUsers',userController.allUsers)
routes.get('/:getConnectedFriends',userController.getFriends)

routes.post('/add',friendsController.add)
// routes.post('/confirm',friendsController.confirm)
routes.get('/:userId',friendsController.friendsList)

routes.post('/getMessage',messageController.getMessage)
routes.post('/addMessage',messageController.addMessage)
routes.post('/deleteMessage',messageController.findlast)

module.exports = routes;