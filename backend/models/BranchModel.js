const mongoose = require("mongoose");
const {Schema} = mongoose;

const branchSchema = new Schema({
    image: {
        type: String,
        required: true
      
    },
    cityName: {
      type: String,
      required: true,
    },
    hotelId: [{
      type: Schema.Types.ObjectId,
      ref: "Hotel",
    }],
    managerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    }

},{ timestamps: true })

module.exports = mongoose.model("Branch", branchSchema);
