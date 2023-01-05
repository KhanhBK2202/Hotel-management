const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({

roomNumber : {
      type: Number,
      required: true
},
images: [ {
     url: {
      type: String,
      required: true
     }
}],
type: {
    type: String,
    required: true,
   
},
priceHour: {
    type: Number,
    required: true,
}, 
priceNextHour: {
    type: Number,
    required: true,
},
priceOverNight: {
    type: Number,
    required: true,
},

size: {
    type: Number,
    required: true,
},
numOfBed: {
            type: Number,
            required: true,
},
numOfGuest: {
         type: Number,
         required: true
},
information: {
       type: String,
       required: true,
},
features: [
       {
         type: String,
         required: true
       }
],
branch: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "Branch"
},
booking: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking"   
}]











  
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);
