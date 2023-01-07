const Booking = require("../models/BookingModel");
const User = require("../models/UserModel");
const BookingController = {
       createBooking: async (req,res) => {
               try {
                const newBooking = new Booking(req.body);
     
                //Save to DB
                const savedBooking = await newBooking.save();
                res.status(200).json(savedBooking);
               } catch(err){
                     res.status(500).json(err);
               }
       },
       getAllBooking: async (req, res) => {
             try{
                   const bookings = await Booking.find();
                   res.status(200).json(bookings);
             }catch(err){
                  res.status(500).json(err);
             }
       },
       getBooking: async (req, res)=> {
        try{
            const booking = await Booking.findById(req.params.id);
            res.status(200).json(booking);
  
        }catch(err){
           res.status(500).json(err);
        }
      },
      getBookingByUser: async (req,res)=> {
            try{
                  const userId = await User.findOne({ username: req.body.username});
                  const booking = await Booking.findById(userId);
                  res.status(200).json(booking);
        
              }catch(err){
                 res.status(500).json(err);
              }
      }

}
module.exports = BookingController;