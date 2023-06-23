const mongoose = require("mongoose");
// const slug = require('mongoose-slug-generator')
// const AutoIncrement = require('mongoose-sequence')(mongoose)

const revenueSchema = new mongoose.Schema({
    hotelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: true
    },
    goal: {
        type: Number, 
    },
    revenue: {
        type: Number,
        required: true,
    },
    totalBookings: {
        type: Number, 
        required: true,
    },
    totalCustomers: {
        type: Number, 
        required: true,
    },
    
}, { timestamps: true });

// Add plugin
// mongoose.plugin(slug)
// revenueSchema.plugin(AutoIncrement, {inc_field: 'hotelId', collection_name: 'hotelCounter'})

module.exports = mongoose.model("Revenue", revenueSchema); 
  