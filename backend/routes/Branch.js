import express from 'express'
const BranchController = require('../controllers/BranchController.js');


const router = express.Router()

//upload
router.post('/post', BranchController.uploadBranch);

//update
router.put('/update/:id', BranchController.updateBranch);

//delete
//router.delete('/delete', BranchController.deleteBranch);

//get All Branch
router.get('/', BranchController.getAllBranch);

//get Branch
router.get('/:id', BranchController.getBranch);


export default router