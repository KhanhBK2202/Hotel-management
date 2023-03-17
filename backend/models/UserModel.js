const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const slug = require('mongoose-slug-generator')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        minLength: [6, 'Password must be at least 6 characters'],
        required: [true, 'Password is required'],
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/des13gsgi/image/upload/v1658686670/avatar/a3yvp0a1gabjqwawgga8.webp'
    },
    slug: {
        type: String,
        slug: 'username',
        unique: true
    },
    role: {
        type: String,
        required: true,
        default: "user",  // user or manager
    },
    hotelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hotel",
    },
    // hotelId : {
    //    type: mongoose.Schema.Types.ObjectId ,
    //    ref: "Hotel",
    //    default: 0,
    //    required: true
    // },
    favRooms: [{
        type: mongoose.Schema.Types.ObjectId ,
        ref: "Room",
    }],
    bookings: [{
        type: mongoose.Schema.Types.ObjectId ,
        ref: "Booking",
    }]
}, { timestamps: true });

//Compare password
// userSchema.methods.comparePassword = function(password) {
//   return bcrypt.compareSync(password, this.hash_password);
// };
// Add plugin
mongoose.plugin(slug)
userSchema.plugin(AutoIncrement, {inc_field: 'userId', collection_name: 'userCounter'})

module.exports = mongoose.model("User", userSchema);
