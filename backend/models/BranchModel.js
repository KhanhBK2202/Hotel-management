const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
    image: {
        type: String,
        // required: true
    },
    cityName: {
        type: String,
        required: true,
    },
    hotels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
    }],
    branchManagerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }

},{ timestamps: true })

module.exports = mongoose.model("Branch", branchSchema);
