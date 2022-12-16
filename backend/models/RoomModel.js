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
children:  {
            type: Number,
            required: true,
},
adult: {
        type: Number,
        required: true,
  
}, 
information: {
       type: String,
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
isAvailable: {
     type: Boolean
},

dayBooked: [
    {   
        fromDate: {
              type: Date,
               required: true
           },
        toDate: {
          type: Date,
          required: true
       }
    }
],







  
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);
