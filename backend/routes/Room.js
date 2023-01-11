const express = require("express");
const RoomController = require('../controllers/RoomController');
const SearchController = require('../controllers/SearchController');
const MiddlewareController = require("../controllers/MiddlewareController.js");
// const Branch = require('../models/BranchModel')
// const Booking = require('../models/BookingModel')
// const Hotel = require('../models/HotelModel')
// const Room =  require('../models/RoomModel')
 
const router = express.Router();

//search by date
// fromDate="yyyy-mm-ddThh:mm:ssZ"
// toDate="yyyy-mm-ddThh:mm:ssZ"
router.get('/search/date',MiddlewareController.verifyToken,SearchController.searchByDate);

//search by hour
//router.get('/search/hour', SearchController.searchByHour);


//upload
router.post('/post/',  MiddlewareController.verifyToken, MiddlewareController.checkManager, RoomController.uploadRoom);

//update
router.put('/update/:id',  MiddlewareController.verifyToken,  MiddlewareController.checkManager,  RoomController.updateRoom);

//get all room
router.get('/',  MiddlewareController.verifyToken, RoomController.getAllRoom);

//get
router.get('/:id',  MiddlewareController.verifyToken, RoomController.getRoom);

// delete 1 type of room
router.delete('/:id',  MiddlewareController.verifyToken,  MiddlewareController.checkManager, RoomController.deleteRoom)

module.exports =  router