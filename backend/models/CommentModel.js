const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    hotelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
        required: true
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

// Add plugin
mongoose.plugin(slug)
commentSchema.plugin(AutoIncrement, {inc_field: 'commentId', collection_name: 'commentCounter'})

module.exports = mongoose.model("Comment", commentSchema); 
  