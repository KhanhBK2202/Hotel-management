const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comment: {
        type: String,
        required: true
    },
    rating: { 
        type: Number, 
        required: true
    },
},  { timestamps: true })

const hotelSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    images: [{
        type: String
    }],
    address: {
        type: String, 
        required: true,
    },
    lat: {
        type: Number, 
        required: true,
    },
    lng: {
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
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Services",
    }],
    hotelManagerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
    },
    reviews: [commentSchema], 
    
}, { timestamps: true });

module.exports = mongoose.model("Hotel", hotelSchema); 
  