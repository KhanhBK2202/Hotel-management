import express from 'express';
const UserController = require('../controllers/UserController.js');
const MiddlwareController = require("./controllers/MiddlewareController.js");


const router = express.Router()

//Get all user
router.get('/',MiddlwareController.verifyToken,UserController.getAllUser);



export default router