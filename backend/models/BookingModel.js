const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
     bookedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
     },
     room: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Room",
     },
     bookingCode: {
          type: String,
          required: true
     },
     qr: {
          type: String,
          required: true
     },
     qrURL: {
          type: String,
          required: true
     },
     imageCheckin: {
          type: String,
     },
     isCheckin: {
          type: Boolean,
          default: false
     },
     isValid: {
          type: Boolean,
          default: false
     },
     // roomNumbers: [Number],
     numberOfGuest:{
          type: Number,
          required: true,
     },
     hotel: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Hotel",
     },
     branch: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Branch",
     },
     price: {
          type: Number,
          required: true,
     },
     servicePrice: {
          type: Number,
          required: true,
     },
     statusPayment: {
          type: String,   
     },
     responseCode: {
          type: Number
     },
     isOverNight: {
          type: Boolean, 
     },
     fromDate: {
          type: Date,
          required: true
     },
     toDate: {
          type: Date,
          required: true
     },
     fromTime: {
          type: String,
          required: true
     },
     toTime: {
          type: String,
          required: true
     },
     numOfHours: Number,
     numOfDays: Number,
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);