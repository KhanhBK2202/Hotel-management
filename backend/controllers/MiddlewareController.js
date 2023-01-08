const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const MiddlewareController = {
    //verifyToken

    verifyToken: (req, res, next)=>{
        const token = req.header.token;
        if(token){
            const accessToken = token.split(" ")[1];
            // jwt.verify(accessToken, process.env.SECRETKEY, (err, user)=> {
            //     if (err){
            //         res.status(403).json("Token is not valid");

            //     }
            //     User.findOne(
            //         {
            //             _id: 
            //         }
            //     )
            //     req.user = user;
            //     next();
            // })
            const idUser = jwt.verify(accessToken, process.env.SECRETKEY);
            User.findOne(
                {
                    _id: idUser
                }
            ).then(
                data=>{
                    if(data){
                        req.data= data
                        next();
                    }else{
                        res.json("No permission");
                    }
                }
            )
        }else{
            res.status(401).json("You're not authenticated")
        }
    },
    checkManager: (req,res,next)=> {
        var role = req.data.role;
        if ( role == 'manager'){
            next();
        }
        else{
            res.json('No permission');
        }
    }
}
module.exports = MiddlewareController;