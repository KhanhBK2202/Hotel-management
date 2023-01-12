const express = require("express");
const BookingController = require('../controllers/BookingController');
const PaymentController = require('../controllers/PaymentController');
const MiddlewareController = require('../controllers/MiddlewareController.js');
const router = express.Router()
// Create booking  req.body.date = "YYYY-MM-DDTHH:MM:SSZ"
router.post('/post', MiddlewareController.verifyToken, BookingController.createBooking);

// Get All booking
router.get('/', MiddlewareController.checkManager, BookingController.getAllBooking);

// Get booking by user
router.get('/:username', MiddlewareController.checkManager, BookingController.getBookingByUser);

// Get booking
router.get('/:id', MiddlewareController.checkManager, BookingController.getBooking);

//Delete by id
router.delete('/:id', MiddlewareController.verifyToken, BookingController.deleteBooking);

// Create payment and redirect to VNPay
router.post('/create_payment_url', PaymentController.createPayment);


router.get('/vnpay_ipn', PaymentController.getPayment);




module.exports =  router