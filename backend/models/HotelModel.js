const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"          
  },
  comment: {
      type: String,
      required: true        // "Good service"  "Nice view"  "Food taste bad"    
  },
  rating: { type: Number, 
            required: true  // 1 , 2, 3, 4, 5
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
        type: Number,
        required: true,
    }, 
    rooms: [{
      
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room",
        
}],
   services: [
        {
          price: Number,
          info: String,
        }
    ],
    hotelManagerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
  },

  //No need
  availableRoom: [
     {
      room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
      roomNumbers: [Number]
     }
  ],
  //No need
    reviews: [commentSchema], 
    
    
  }, { timestamps: true });

  module.exports = mongoose.model("Hotel", hotelSchema); 
  