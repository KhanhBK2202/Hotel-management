const mongoose = require("mongoose");

const branchSchema = mongoose.Schema({
    image: {
      type: String,
      required: true,
    },
    cityName: {
      type: String,
      required: true,
    },
    hotelId: {
      type: mongoose.Schema.ObjectId,
      ref: "Hotel",
    },
    managerId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    }

})

module.exports = mongoose.model("Branch", branchSchema);
