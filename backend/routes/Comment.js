const express = require("express");
const CommentController = require('../controllers/CommentController');
const MiddlewareController = require("../controllers/MiddlewareController.js");

const router = express.Router();

// Get service
//router.get('/service', MiddlewareController.verifyToken, HotelController.getService);

// upload comment
router.post('/post', MiddlewareController.verifyToken, CommentController.uploadComment);

// get all comments
router.get('/', CommentController.getAllComment);

// // get comment in a hotel
// router.get('/hotel/:id', CommentController.getComment);

// get highest score comment
router.get('/highestScore', CommentController.getHighestScoreComment);

// update comment
router.put('/update/:id', MiddlewareController.verifyToken, CommentController.updateComment);

// delete comment
router.delete('/delete/:id', MiddlewareController.verifyToken, CommentController.deleteComment);

// get user comment and all comment (except user comment)
router.get('/:userId/:hotelId', MiddlewareController.verifyToken, CommentController.getComment);





module.exports =  router