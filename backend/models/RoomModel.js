const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const roomSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        slug: 'type',
    },
    roomNumbers: [{
        type: Number,   // VIP-01
        required: true  // each room of each hotel contain distinct different number
                        // for checking available rooms
    }],
    thumbnail: {
        type: String,
        required: true
    },
    images: [{
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
    features: [{
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "Features"
        type: String,
        required: true,
    }],
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel"
    },
    // booking: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Booking"   
    // }]
}, { timestamps: true });

// Add plugin
mongoose.plugin(slug)
roomSchema.plugin(AutoIncrement, {inc_field: 'roomId', collection_name: 'roomCounter'})

module.exports = mongoose.model("Room", roomSchema);
