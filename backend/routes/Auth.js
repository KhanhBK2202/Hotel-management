import express from 'express'
const AuthController = require('../controllers/AuthController.js');


const router = express.Router()

router.post('/register',AuthController.register)
router.post('/login', AuthController.login)


export default router