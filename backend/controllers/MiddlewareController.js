const jwt = require("jsonwebtoken");
// const User = require("../models/UserModel");

const MiddlewareController = {
    //verifyToken

    verifyToken: (req, res, next) => {
        //ACCESS TOKEN FROM HEADER, REFRESH TOKEN FROM COOKIE
        const token = req.headers.token;
        // const refreshToken = req.cookies.refreshToken;
        if (token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json("Token is not valid!");
                }
                req.user = user;
                next();
            });
        } else {
            return res.status(401).json("You're not authenticated");
        }
    },

    // verifyTokenAndUserAuthorization: (req, res, next) => {
    //     verifyToken(req, res, () => {
    //         if (req.user.id === req.params.id || req.user.role === 'manager') {
    //             next();
    //         } else {
    //             return res.status(403).json("You're not allowed to do that!");
    //         }
    //     });
    // },

    checkManager: (req, res, next) => {
        MiddlewareController.verifyToken(req, res, () => {
            // var role = req.data.role;
            if (req.user.role === 'manager' || req.user.role === 'admin'){
                next();
            } else {
                res.status(403).json('No permission');
            }
        })
    }
}
module.exports = MiddlewareController;