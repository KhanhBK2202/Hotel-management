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
           time  :  {
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
    services: [
        {
          price: Number,
          info: String,
          
        }
    ],
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
    
    
  }, { timestamps: true });

  module.exports = mongoose.model("Hotel", hotelSchema); 
  