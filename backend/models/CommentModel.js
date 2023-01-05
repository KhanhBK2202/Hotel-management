const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    userId: {
           type: mongoose.Schema.ObjectId,
           ref: "Comment"
    },
    hotelId: {
           type: mongoose.Schema.ObjectId,
           ref: "Room"
    }, 
    comment: {
        type: String,
        required: true
    },
    rating: { type: Number, 
              required: true
    },


},  { timestamps: true })

module.exports =  mongoose.model("Comment", commentSchema);