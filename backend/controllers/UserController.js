const User = require("../models/UserModel");

export const UserController = {
    getAllUser : async(req, res) => {
        try{
              const user = await User.find();
              res.status(200).json(user);

        }catch(err){
             res.status(500).json(err);
        }
    },
    
}