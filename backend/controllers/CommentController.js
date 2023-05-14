const Comment =  require("../models/CommentModel");
const CommentController = {
    // [POST] /api/v1/comment/post
    uploadComment: (req, res, next)=> {
        const newComment = new Comment(req.body);
        newComment
            .save()
            .then(() => res.status(200).json(newComment))
    },
    // [GET] /api/v1/comment
    getAllComment: async (req, res)=> {
        try{
            const result = await Comment.find().sort({ createdAt: -1 }).populate('userId').populate('hotelId');
            res.status(200).json(result);
        }catch(err){
            res.status(500).json(err);
        }
    },
    // // [GET] /api/v1/comment/hotel/:id
    // getComment: async (req, res)=> {
    //     try{
    //         const result = await Comment.find({ hotelId: req.params.id}).sort({ createdAt: -1 }).populate('userId');
    //         res.status(200).json(result);
    //     }catch(err){
    //         res.status(500).json(err);
    //     }
    // },
    // [GET] /api/v1/comment/highestScore
    getHighestScoreComment: async (req, res)=> {
        try{
            const result = await Comment.find().sort({ rating: -1, createdAt: -1 }).populate('userId');
            res.status(200).json(result);
        }catch(err){
            res.status(500).json(err);
        }
    },
    // [PUT] /api/v1/comment/update/:id
    updateComment: async (req, res)=> {
        try{
            const newComment = await Comment.findOneAndUpdate({ _id: req.params.id }, { $set: req.body });
            res.status(200).json({
                status: "Successfully",
                data: {
                    newComment
                }
            });
        }catch(err){
            res.status(500).json(err);
        }
    },
    // [DELETE] /api/v1/comment/delete/:id
    deleteComment: async (req, res)=> {
        try{
            const deletedComment = await Comment.findByIdAndRemove({ _id: req.params.id });
            res.status(204).json({
                status: "Successfully",
                data: {
                    deletedComment
                }
            });
        }catch(err){
            res.status(500).json(err);
        }
    },
    // [GET] /api/v1/comment/:userId/:hotelId
    getComment: async (req, res)=> {
        try{
            const userComment = await Comment.findOne({ userId: req.params.userId, hotelId: req.params.hotelId }).populate('userId');
            const allComment = await Comment.find({ userId: {$ne: req.params.userId}, hotelId: req.params.hotelId }).populate('userId');
            res.status(200).json({
                data: {
                    userComment,
                    allComment
                }
            });
        }catch(err){
            res.status(500).json(err);
        }
    },
    
}
module.exports = CommentController;