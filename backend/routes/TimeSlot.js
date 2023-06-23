const express = require("express");
const TimeSlotController = require('../controllers/TimeSlotController.js');
const MiddlewareController = require("../controllers/MiddlewareController.js");


const router = express.Router()

//Get all time slot
router.get('/', TimeSlotController.getTimeSlot);

//Update time slot
router.put('/update/:id', MiddlewareController.checkManager, TimeSlotController.updateTimeSlot);

//Delete time slot
router.delete('/:id' ,MiddlewareController.checkManager, TimeSlotController.deleteTimeSlot);

module.exports =  router