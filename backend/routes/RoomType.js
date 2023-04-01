const express = require("express");
const RoomTypeController = require('../controllers/RoomTypeController');
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
router.post('/post', MiddlewareController.checkManager, RoomTypeController.createType);

//update
router.put('/update/:id', MiddlewareController.checkManager,  RoomTypeController.updateRoom);

//get specific room of a hotel
router.get('/:roomId/:hotelId', RoomTypeController.getRoom);

//get all room
router.get('/', RoomTypeController.getAllRoom);

// delete 1 type of room
router.delete('/:id', MiddlewareController.checkManager, RoomTypeController.deleteRoom)

module.exports =  router