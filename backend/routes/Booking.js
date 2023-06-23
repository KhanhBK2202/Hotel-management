const express = require("express");
const BookingController = require('../controllers/BookingController');
const PaymentController = require('../controllers/PaymentController');
const MiddlewareController = require('../controllers/MiddlewareController.js');
const router = express.Router()
// Create booking  req.body.date = "YYYY-MM-DDTHH:MM:SSZ"
router.post('/post', MiddlewareController.verifyToken, BookingController.createBooking);

// Upload booking id card/passport
router.put('/image/:bookingCode', MiddlewareController.verifyToken, BookingController.uploadImage);

// // Get All booking
// router.get('/abc', BookingController.getExpiredBooking);

// Get All booking
router.get('/hotel/:hotelId', MiddlewareController.checkManager, BookingController.getAllBooking);

// Get distinct users
router.get('/hotel/:hotelId/distinct', MiddlewareController.checkManager, BookingController.getDistinctUser);

// Get revenue by date
router.get('/hotel/:hotelId/:type/:code/:year/revenue', MiddlewareController.checkManager, BookingController.getRevenueByDate);

// Get booking by date and name
router.get('/byDate/@:username/:from/:to/:hotelId', MiddlewareController.checkManager, BookingController.getBookingByDateByName);

// Get booking by date
router.get('/byDate/:from/:to/:hotelId', MiddlewareController.checkManager, BookingController.getBookingByDate);

// Get past booking
router.get('/:id/past', MiddlewareController.verifyToken, BookingController.getPastBooking);

// Get future booking
router.get('/:id/upcoming', MiddlewareController.verifyToken, BookingController.getUpcomingBooking);

// Get present booking
router.get('/:id/present', MiddlewareController.verifyToken, BookingController.getPresentBooking);

// Get booking by user (dùng để search)
router.get('/@:username/:hotelId', MiddlewareController.checkManager, BookingController.getBookingByUser);

// Get booking by booking code
router.get('/:id', BookingController.getBooking);

// Get all booking of user
router.get('/:userId/all', MiddlewareController.verifyToken, BookingController.getAllBookingByUser);

// Check existing user
router.get('/:userId/:hotelId', MiddlewareController.verifyToken, BookingController.checkExistUser);

//Delete by id
router.delete('/:id', MiddlewareController.verifyToken, BookingController.deleteBooking);

// Create payment and redirect to VNPay
router.post('/create_payment_url', PaymentController.createPayment);


router.get('/vnpay_ipn', PaymentController.getPayment);




module.exports =  router