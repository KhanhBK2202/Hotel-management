import express from 'express'
const BookingController = require('../controllers/BookingController');
const router = express.Router()
// Create booking
router.post('/post', BookingController.createBooking);

// Get All booking
router.get('/', BookingController.getAllBooking);

// Get booking
router.get('/:id', BookingController.getBooking);




export default router