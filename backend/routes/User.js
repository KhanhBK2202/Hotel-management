const express = require("express");
const UserController = require('../controllers/UserController.js');
const MiddlewareController = require("../controllers/MiddlewareController.js");


const router = express.Router()

//Get all user
router.get('/',MiddlewareController.verifyToken,MiddlewareController.checkManager,UserController.getAllUser);
//Get user
router.get('/:id',MiddlewareController.verifyToken,UserController.getUser);
//Update user
router.put('/update/:id',MiddlewareController.verifyToken,UserController.updateUser);

// Get all bookings of 1 user
// History bookings of 1 user
router.get('/allbookings/:id',MiddlewareController.verifyToken,UserController.getAllBookingOfUser);

//Delete 1 user
router.delete('/:id',MiddlewareController.verifyToken,UserController.deleteUser);

module.exports =  router