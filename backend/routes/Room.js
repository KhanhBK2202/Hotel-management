const express = require("express");
const RoomController = require('../controllers/RoomController');
const SearchController = require('../controllers/SearchController');
const router = express.Router();

//search by date
router.get('/search/date', SearchController.searchByDate);

//search by hour
//router.get('/search/hour', SearchController.searchByHour);


//upload
router.post('/post', RoomController.uploadRoom);

//update
router.put('/update/:id', RoomController.updateRoom);

//get all room
router.get('/', RoomController.getAllRoom);

//get
router.get('/:id', RoomController.getRoom);



module.exports =  router