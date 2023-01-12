const User = require("../models/UserModel");
const Booking = require("../models/BookingModel");
const Hotel =  require("../models/HotelModel");
const Branch =  require("../models/BranchModel");
const UserController = {
    getAllUser: async(req, res) => {
        try {
            const user = await User.find();
            res.status(200).json(user);
        } catch(err) {
            res.status(500).json(err);
        }
    },
    // Get user by id
    getUser: async(req, res) => {
        try{
            const id = req.params.id;
            const user = await User.findById(id);
            res.status(200).json(user)
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    // Update user
    updateUser:  async(req, res) => {
        try{
            const id = req.params.id;
            const user = await User.findById(id);
            await user.updateOne({ $set: req.body })
            res.status(200).json("Updated successfully");
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    getAllBookingOfUser: async(req, res) => {
        try{
         
            const bookings = await User.find({ _id: req.params.id},{ bookings: 1  });
           
            res.status(200).json(bookings);
        }
        catch(err){
            res.status(500).json(err);
        }
    },
    deleteUser: async(req,res)=> {
        try{
             const user = await User.findById(req.params.id);
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
             await User.findByIdAndDelete(req.params.id);
             res.status(200).json("Deleted successfully");
        }
        catch(err){
            res.status(500).json(err);
        }
    }
 


    
}
module.exports = UserController;