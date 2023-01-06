import express from 'express';
const RoomController = require('../controllers/Room.js');
const SearchController = require('../controllers/SearchController.js');
const router = express.Router();

//search by date
router.get('/search/date', SearchController.searchByDate);

//search by hour
router.get('/search/hour', SearchController.searchByHour);


//upload
router.post('/post', RoomController.uploadRoom);

//update
router.put('/update/:id', RoomController.updateRoom);

//get all room
router.get('/', RoomController.getAllRoom);

//get
router.get('/:id', RoomController.getRoom);



export default router;