const express = require("express");
const UserController = require('../controllers/UserController.js');
const MiddlewareController = require("../controllers/MiddlewareController.js");


const router = express.Router()

// Get all bookings of 1 user
// History bookings of 1 user
router.get('/@:username', MiddlewareController.verifyToken, UserController.getAllBookingOfUser);

//Get user
router.get('/:id', MiddlewareController.verifyToken, UserController.getUser);

//Get all user
router.get('/', MiddlewareController.checkManager, UserController.getAllUser);

//Update user
router.put('/update/:id', MiddlewareController.verifyToken, UserController.updateUser);

//Delete 1 user
router.delete('/:id' ,MiddlewareController.verifyToken, UserController.deleteUser);

module.exports =  router