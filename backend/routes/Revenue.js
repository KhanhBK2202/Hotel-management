const express = require("express");
const RevenueController = require('../controllers/RevenueController');
const MiddlewareController = require("../controllers/MiddlewareController.js");

const router = express.Router();

// get hotel revenue
router.get('/:id', MiddlewareController.checkManager, RevenueController.getHotelRevenue);

// get all hotel revenue
router.get('/', MiddlewareController.checkManager, RevenueController.getRevenue);

//upload
router.post('/:id', MiddlewareController.checkManager, RevenueController.uploadRevenue);

//update
router.put('/:id', MiddlewareController.checkManager, RevenueController.updateRevenue);

module.exports =  router