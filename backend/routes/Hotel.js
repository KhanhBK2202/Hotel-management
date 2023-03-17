const express = require("express");
const HotelController = require('../controllers/HotelController');
const MiddlewareController = require("../controllers/MiddlewareController.js");

const router = express.Router();

// Get service
//router.get('/service', MiddlewareController.verifyToken, HotelController.getService);

//upload
router.post('/post', MiddlewareController.verifyToken, HotelController.uploadHotel);

//update
router.put('/update/:id', MiddlewareController.checkManager,HotelController.updateHotel);

//get services of a hotel
router.get('/services/:id', MiddlewareController.verifyToken, HotelController.getServicesOfAHotel);

//get all services
router.get('/all-services', HotelController.getAllServices);

//get service info
router.get('/service/:id', HotelController.getService);

//post services 
router.post('/post-services', HotelController.uploadService);

//get reviews
router.get('/reviews/:id', MiddlewareController.verifyToken, HotelController.getComment);

//get most popular hotel
router.get('/most-popular', HotelController.mostPopular);

//get hotel
router.get('/:id', HotelController.getHotel);

//get all hotel
router.get('/', HotelController.getAllHotel);

//delete 1 hotel
router.delete('/delete/:id', MiddlewareController.checkManager, HotelController.deleteHotel);





module.exports =  router