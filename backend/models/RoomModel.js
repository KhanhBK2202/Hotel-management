const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({

roomNumber: {
    type: String,
    required: true,
},
images: [ {
     url: {
      type: String
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
priceOverNight: {
    type: Number,
    required: true,
},
isAvailable: {
    type: Boolean,
    required: true,
},

numOfBed: {
            type: Number,
            required: true,
},
children:  {
            type: Number,
            required: true,
},
adult: {
        type: Number,
        required: true,
  
}
        
,
hotelId: {
  type: mongoose.Schema.ObjectId,
  ref: "Hotel"
}
,
commentId: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Comment"
    },
],



  
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);
