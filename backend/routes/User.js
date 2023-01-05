import express from 'express';
const UserController = require('../controllers/UserController.js');
const MiddlwareController = require("./controllers/MiddlewareController.js");


const router = express.Router()

//Get all user
router.get('/',MiddlwareController.verifyToken,UserController.getAllUser);
//Get user
router.get('/:id',MiddlwareController.verifyToken,UserController.getUser);
//Update user
router.put('/update/:id',MiddlwareController.verifyToken,UserController.updateUser);
export default router