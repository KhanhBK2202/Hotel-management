const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose)

const timeSlotSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    scale: { // price maybe raise according to time slot
        type: Number,
        required: true,
    }
}, { timestamps: true });

// Add plugin
timeSlotSchema.plugin(AutoIncrement, {inc_field: 'timeSlotId', collection_name: 'timeSlotCounter'})

module.exports = mongoose.model("TimeSlot", timeSlotSchema);
