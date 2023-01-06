import express from 'express';
const HotelController = require('../controllers/HotelController');


const router = express.Router();

// Get service
router.get('/service', HotelController.getService);

//upload
router.post('/post', HotelController.uploadHotel);

//update
router.put('/update/:id', HotelController.updateHotel);

//get services
router.get('/services/:id', HotelController.getService);

//get reviews
router.get('/reviews/:id', HotelController.getComment);

//get all hotel
router.get('/', HotelController.getAllHotel);

//get hotel
router.get('/:id', HotelController.getHotel);


