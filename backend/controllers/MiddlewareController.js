const jwt = require("jsonwebtoken");

const MiddlewareController = {
    //verifyToken

    verifyToken: (req, res, next)=>{
        const token = req.header.token;
        if(token){
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.SECRETKEY, (err, user)=> {
                if (err){
                    res.status(403).json("Token is not valid");

                }
                req.user = user;
                next();
            })
        }else{
            res.status(401).json("You're not authenticated")
        }
    },
    checkManager: (req,res,next)=> {
        var role = req.user.role;
        if ( role == 'manager'){
            next();
        }
        else{
            res.json('No permission');
        }
    }
}
module.exports = MiddlewareController;