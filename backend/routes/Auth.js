const express = require("express");
const AuthController = require('../controllers/AuthController.js');
const MiddlewareController = require('../controllers/MiddlewareController.js');

const router = express.Router()

router.post('/register', AuthController.registerUser)
router.post('/login', AuthController.loginUser)
router.post("/refresh", AuthController.requestRefreshToken);
router.post("/logout", MiddlewareController.verifyToken, AuthController.logOut);


module.exports =  router