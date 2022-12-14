const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    roomId: [{
      type: mongoose.Schema.ObjectId,
      ref: "Room",
    }],
    hotelId: {
      type: mongoose.Schema.ObjectId,
      ref: "Hotel",
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
    numOfRooms: Number,
    
    
    
  
});

module.exports = mongoose.model("Booking", bookingSchema);