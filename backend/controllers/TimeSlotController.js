const TimeSlot = require("../models/TimeSlotModel");
const Booking = require("../models/BookingModel");
const Hotel =  require("../models/HotelModel");
const Branch =  require("../models/BranchModel");
const UserController = {
    getTimeSlot: async(req, res) => {
        try {
            const user = await TimeSlot.find();
            res.status(200).json(user);
        } catch(err) {
            res.status(500).json(err);
        }
    },
    // Update user
    updateTimeSlot:  async(req, res) => {
        try{
            const id = req.params.id;
            const user = await TimeSlot.findById(id);
            await user.updateOne({ $set: req.body })
            res.status(200).json("Updated successfully");
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    deleteTimeSlot: async(req,res)=> {
        try{
             const user = await TimeSlot.findById(req.params.id);
             if (user.role == 'manager'){
                await Branch.updateMany(
                    { branchManagerId: req.params.id},
                    { branchManagerId: null}
                 )
                 await Hotel.updateMany(
                    { hotelManagerId: req.params.id},
                    { hotelManagerId: null}
                 )
                 
             }
             await Booking.updateMany(
                { bookedBy: req.params.id},
                { bookedBy: null}
             )
             await TimeSlot.findByIdAndDelete(req.params.id);
             res.status(200).json("Deleted successfully");
        }
        catch(err){
            res.status(500).json(err);
        }
    }
    
}
module.exports = UserController;