const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    room: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
    roomNumbers: [Number],
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
    servicePrice: {
         type: Number,
         required: true,
    },
    statusPayment: {
          type: String, // Not paid or success or Fail checksum
    },
    responseCode: {
         type: Number // 100 or list of response code in VNPay
    },
    isOverNight: {
          type: Boolean, 
    },
    fromDate: {
     type:Date,
     required: true
    }, // required true
    toDate: {
      type: Date,
      required: true
     }, // required true
    
    numOfHours: Number,
    numOfDays: Number,
    
    
    
  
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);