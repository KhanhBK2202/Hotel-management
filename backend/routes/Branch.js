const express = require("express");
const BranchController = require('../controllers/BranchController.js');
const MiddlewareController = require('../controllers/MiddlewareController.js');


const router = express.Router()

//upload
router.post('/post', MiddlewareController.checkManager,BranchController.uploadBranch);

//update
router.put('/update/:id', MiddlewareController.checkManager,BranchController.updateBranch);

//delete
//router.delete('/delete', BranchController.deleteBranch);

//get All Branch
router.get('/', MiddlewareController.verifyToken, BranchController.getAllBranch);

//get Branch
router.get('/:id', MiddlewareController.checkManager, BranchController.getBranch);

//delete 1 Branch
router.delete('/:id', MiddlewareController.checkManager, BranchController.deleteBranch);
module.exports =  router