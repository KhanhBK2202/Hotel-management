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
    MoMoPayment: {
          type: Boolean,
          required: true
    },
    isOverNight: {
          type: Boolean, 
    },
    fromDate: Date,
    toDate: Date,
    numOfHours: Number,
    numOfDays: Number,
    
    
    
  
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);