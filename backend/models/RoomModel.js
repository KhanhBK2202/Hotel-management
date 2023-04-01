const mongoose = require("mongoose");
// const slug = require('mongoose-slug-generator')
// const AutoIncrement = require('mongoose-sequence')(mongoose)

const roomSchema = new mongoose.Schema({
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RoomType"
    },
    name: {
        type: String,
        required: true
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        default: null
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true
    },
}, { timestamps: true });

// Add plugin
// mongoose.plugin(slug)
// roomSchema.plugin(AutoIncrement, {inc_field: 'roomTypeId', collection_name: 'roomCounter'})

module.exports = mongoose.model("Room", roomSchema);
