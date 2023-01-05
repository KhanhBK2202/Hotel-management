import express from 'express';
const HotelController = require('../controllers/HotelController');


const router = express.Router();

// Get service
router.get('/service', HotelController.getService);

//upload
router.post('/post', HotelController.uploadHotel);

//update
router.put('/update/:id', HotelController.updateHotel);

//get all hotel
router.get('/', HotelController.getAllHotel);

//get hotel
router.get('/:id', HotelController.getHotel);


