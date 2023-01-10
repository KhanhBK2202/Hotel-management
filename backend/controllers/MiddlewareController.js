const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const MiddlewareController = {
    //verifyToken

    verifyToken: (req, res, next)=>{
       // const token = req.header.token;
       const token = req.headers.token;
    //    const token = req.header["authorization"]
      
        if(token){
            
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
            const accessToken = token.split(' ')[1];
            const idUser = jwt.verify(accessToken, 'khanhquan');
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
            res.status(401).json("You're not authenticated!")
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