const express = require("express");
const UserController = require('../controllers/UserController.js');
const MiddlewareController = require("../controllers/MiddlewareController.js");


const router = express.Router()

//Get all user
router.get('/',MiddlewareController.verifyToken,UserController.getAllUser);
//Get user
router.get('/:id',MiddlewareController.verifyToken,UserController.getUser);
//Update user
router.put('/update/:id',MiddlewareController.verifyToken,UserController.updateUser);
module.exports =  router