const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const branchSchema = new mongoose.Schema({
    image: {
        type: String,
        // required: true
    },
    cityName: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        slug: 'cityName',
        unique: true
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

// Add plugin
mongoose.plugin(slug)
branchSchema.plugin(AutoIncrement, {inc_field: 'branchId', collection_name: 'branchCounter'})

module.exports = mongoose.model("Branch", branchSchema);
