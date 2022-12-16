import express from 'express'
const BranchController = require('../controllers/BranchController.js');


const router = express.Router()

router.post('/uploadInfo',BranchController.uploadInfo)
router.get('/getInfo', BranchController.getInfo)


export default router