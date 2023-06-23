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
router.post('/post', MiddlewareController.checkManager, RoomController.createRoom);

//update
router.put('/update/:id', MiddlewareController.verifyToken, RoomController.updateRoom);

//get specific room of a hotel
router.get('/:roomId/:hotelId', RoomController.getRoom);

//get all room
router.get('/:roomtypeId', RoomController.getRoomHotel);

//get all room
router.get('/', RoomController.getAllRoom);

// get room by type
router.get('/:typeId', RoomController.getRoomByType);

// delete 1 type of room
router.delete('/:id', MiddlewareController.checkManager, RoomController.deleteRoom)

module.exports =  router