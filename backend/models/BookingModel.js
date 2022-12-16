const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    roomId: {
      type: mongoose.Schema.ObjectId,
      ref: "Room",
    },
    servicePrice:{
         type: Number,
         required: true,
    },
    MoMoPayment: {
          type: Boolean,
          required: true
    },
    totalPrice: {
         type: Number,
         required: true,

    },
    isOverNight: {
          type: Boolean,
          required: true,  
    },
    from: Date,
    to: Date,
    numOfDays: Number,
    
    
    
  
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);