const express = require("express");
const BookingController = require('../controllers/BookingController');
const PaymentController = require('../controllers/PaymentController');
const MiddlewareController = require('../controllers/MiddlewareController.js');
const router = express.Router()
// Create booking  req.body.date = "YYYY-MM-DDTHH:MM:SSZ"
router.post('/post', MiddlewareController.verifyToken, BookingController.createBooking);

// Upload booking id card/passport
router.put('/image/:bookingCode', MiddlewareController.verifyToken, BookingController.uploadImage);

// Get All booking
router.get('/', MiddlewareController.checkManager, BookingController.getAllBooking);

// Get booking by date and name
router.get('/byDate/@:username/:from/:to', MiddlewareController.checkManager, BookingController.getBookingByDateByName);

// Get booking by date
router.get('/byDate/:from/:to', MiddlewareController.checkManager, BookingController.getBookingByDate);

// Get past booking
router.get('/:id/past', MiddlewareController.verifyToken, BookingController.getPastBooking);

// Get future booking
router.get('/:id/upcoming', MiddlewareController.verifyToken, BookingController.getUpcomingBooking);

// Get present booking
router.get('/:id/present', MiddlewareController.verifyToken, BookingController.getPresentBooking);

// Get booking by user (dùng để search)
router.get('/@:username', MiddlewareController.checkManager, BookingController.getBookingByUser);

// Get booking by id
router.get('/:id', BookingController.getBooking);

//Delete by id
router.delete('/:id', MiddlewareController.verifyToken, BookingController.deleteBooking);

// Create payment and redirect to VNPay
router.post('/create_payment_url', PaymentController.createPayment);


router.get('/vnpay_ipn', PaymentController.getPayment);




module.exports =  router