const mongoose = require("mongoose");

const featuresSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Features", featuresSchema);
