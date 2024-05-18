const express = require("express");
const routes = express.Router();   
const userController=require('../Controller/UserController')
routes.post('/addUser',userController.addUser)
routes.post('/signIn',userController.signIn)
routes.get('/allUsers',userController.allUsers)


module.exports = routes;