const express = require("express");
const HotelController = require('../controllers/HotelController');
const MiddlewareController = require("../controllers/MiddlewareController.js");

const router = express.Router();

// Get service
//router.get('/service', MiddlewareController.verifyToken, HotelController.getService);

//upload
router.post('/post',  MiddlewareController.verifyToken,MiddlewareController.checkManager, HotelController.uploadHotel);

//update
router.put('/update/:id',  MiddlewareController.verifyToken, MiddlewareController.checkManager,HotelController.updateHotel);

//get services
router.get('/services/:id',  MiddlewareController.verifyToken, HotelController.getService);

//get reviews
router.get('/reviews/:id',  MiddlewareController.verifyToken, HotelController.getComment);

//get all hotel
router.get('/',  MiddlewareController.verifyToken, HotelController.getAllHotel);

//get hotel
router.get('/:id',  MiddlewareController.verifyToken, HotelController.getHotel);

//delete 1 hotel
router.delete('/:id', MiddlewareController.verifyToken, MiddlewareController.checkManager, HotelController.deleteHotel);


module.exports =  router