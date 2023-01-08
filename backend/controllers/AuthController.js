const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthController ={
    register : async (req, res) => {
       try{
           const salt = await bcrypt.genSalt(10);
           const hashed = await bcrypt.hash(req.body.password, salt);

           //Create new user

           const newUser = await new User({
               username: req.body.username,
               email: req.body.email,
               password: hashed,
               role: req.body.role
           });

           //Save to DB
           const user = await newUser.save();
           res.status(200).json(user);
       }
       catch(err){
            res.status(500).json(err);
       }
},

    login : async (req, res) => {
        try{
            const user = await User.findOne({username: req.body.username});
            if (!user){
                res.status(404).json("Incorrect username");
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )

            if(!validPassword){
                res.status(404).json("Incorrect password");
            }
            if (user && validPassword){
                const accessToken = jwt.sign({
                    _id: user._id,
                  
                    
                },
                'khanhquan',
                {
                    expiresIn: "20d"
                }

                
                );
          
                res.status(200).json({accessToken: accessToken});
            }
        }catch(err){
           
             res.status(501).json(err);
        }
}
}
module.exports = AuthController;






