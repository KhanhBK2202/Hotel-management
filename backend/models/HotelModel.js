const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator')
const AutoIncrement = require('mongoose-sequence')(mongoose)

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
    slug: {
        type: String,
        slug: 'name',
        unique: true
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

// Add plugin
mongoose.plugin(slug)
hotelSchema.plugin(AutoIncrement, {inc_field: 'hotelId', collection_name: 'hotelCounter'})

module.exports = mongoose.model("Hotel", hotelSchema); 
  