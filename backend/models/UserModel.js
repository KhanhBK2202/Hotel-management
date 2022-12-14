const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
   
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
    
  },


  
}, { timestamps: true });

//Compare password
// userSchema.methods.comparePassword = function(password) {
//   return bcrypt.compareSync(password, this.hash_password);
// };

module.exports = mongoose.model("User", userSchema);