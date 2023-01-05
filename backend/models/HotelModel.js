const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  userId: {
         type: mongoose.Schema.ObjectId,
         ref: "Comment"
  },
  comment: {
      type: String,
      required: true
  },
  rating: { type: Number, 
            required: true
  },


},  { timestamps: true })
const hotelSchema = new mongoose.Schema({
  images: [ {
    url: {
     type: String
    }
}],

    address: {

     type: String, 
      required: true,
   
    },
    lat : {
      type: Number, 
      required: true,
    },
    lng : {
      type: Number, 
      required: true,
    },
    floor: {
       type: Number,
       required: true,  
    },
    totalRoom: {
        type: Number
    }, 
    rooms: [{
       roomId: {
            type: mongoose.Schema.ObjectId,
            ref: "Room",
        }
}],
   services: [
        {
          price: Number,
          info: String,
        }
    ],
    managerId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    reviews: [commentSchema], 
    
    
  }, { timestamps: true });

  module.exports = mongoose.model("Hotel", hotelSchema); 
  