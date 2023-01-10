const express = require("express");
const BookingController = require('../controllers/BookingController');
const PaymentController = require('../controllers/PaymentController');
const MiddlewareController = require('../controllers/MiddlewareController.js');
const router = express.Router()
// Create booking  req.body.date = "YYYY-MM-DDTHH:MM:SSZ"
router.post('/post', MiddlewareController.verifyToken,BookingController.createBooking);

// Get All booking
router.get('/', MiddlewareController.verifyToken, MiddlewareController.checkManager,BookingController.getAllBooking);

// Get booking
router.get('/:id', MiddlewareController.verifyToken, MiddlewareController.checkManager,BookingController.getBooking);

// Get booking by user
router.get('/user', MiddlewareController.verifyToken, MiddlewareController.checkManager,BookingController.getBookingByUser);

//Delete by id
router.delete('/:id', MiddlewareController.verifyToken, BookingController.deleteBooking);

// Create payment and redirect to VNPay
router.post('/create_payment_url', PaymentController.createPayment);


router.get('/vnpay_ipn', PaymentController.getPayment);
router.get('/vnpay_return', PaymentController.getPaymentReturn);




module.exports =  router