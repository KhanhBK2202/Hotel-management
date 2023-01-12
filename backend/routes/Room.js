const express = require("express");
const RoomController = require('../controllers/RoomController');
const SearchController = require('../controllers/SearchController');
const MiddlewareController = require("../controllers/MiddlewareController.js");

const router = express.Router();

//search by date
// fromDate="yyyy-mm-dd-hh"
// toDate="yyyy-mm-dd-hh"
router.get('/search/date', MiddlewareController.verifyToken, SearchController.searchByDate);

//search by hour
//router.get('/search/hour', SearchController.searchByHour);


//upload
router.post('/post', MiddlewareController.checkManager, RoomController.uploadRoom);

//update
router.put('/update/:id', MiddlewareController.checkManager,  RoomController.updateRoom);

//get specific room of a hotel
router.get('/:roomId/:hotelId', RoomController.getRoom);

//get all room
router.get('/', RoomController.getAllRoom);

// delete 1 type of room
router.delete('/:id', MiddlewareController.checkManager, RoomController.deleteRoom)

module.exports =  router