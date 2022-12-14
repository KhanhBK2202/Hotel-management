const mongoose = require("mongoose");
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
    floor: {
       type: Number,
       required: true,  
    },
    totalRoom: {
        type: Number
    },
    room: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Room",
        }
    ],
    services:{
        rentCar: {
           price : {
             type: Number,
             required: true,
           },
           time:  {
              type: Date,
              required: true,
           }        
        },
        bar: {
          price : {
            type: Number,
            required: true,
          },
          time:  {
             type: Date,
             required: true,
          }       
        },
        yoga: {
          price : {
            type: Number,
            required: true,
          },
          time:  {
             type: Date,
             required: true,
          }       
        },
        cleanRoom: {
          price : {
            type: Number,
            required: true,
          },
          time:  {
             type: Date,
             required: true,
          }       
        }
    },
    branchId : {
      type: mongoose.Schema.ObjectId,
      ref: "Branch",
    },
    managerId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    commentId: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Comment",
      }
    ], 
    
    
  });

  module.exports = mongoose.model("Hotel", hotelSchema); 
  