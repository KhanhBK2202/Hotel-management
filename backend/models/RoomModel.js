const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({

roomNumbers : [{
      type: Number,
      required: true  // each room of each hotel contain distinct different number
                      // for checking available rooms
}],
images: [ {
   
      type: String,
      required: true
     
}],
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
numOfPeople: {
         type: Number,
         required: true // Just 2 or 4 or 6 
},
description: {
       type: String,
       required: true,
},
features: [
       {
         type: String,
         required: true,
       }
],
hotel: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "Hotel"
},
// booking: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Booking"   
// }]











  
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);
