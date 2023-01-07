const User = require("../models/UserModel");
const UserController = {
    getAllUser : async(req, res) => {
        try{
              const user = await User.find();
              res.status(200).json(user);

        }catch(err){
             res.status(500).json(err);
        }
    },
    // Get user by id
    getUser: async(req, res) => {
        try{
            const id = req.params.id;
            const user = await User.findById(id);
            res.status(200).json(user)
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    // Update user
    updateUser:  async(req, res) => {
        try{
            const id = req.params.id;
            const user = await User.findById(id);
            await user.updateOne({ $set: req.body })
            res.status(200).json("Updated successfully");
        }
        catch(err){
            res.status(500).json(err);
        }
    },
 


    
}
module.exports = UserController;