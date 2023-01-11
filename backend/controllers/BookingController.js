const Booking = require("../models/BookingModel");

const User = require("../models/UserModel");
const BookingController = {
      createBooking: async (req,res) => {
               try {

                // req.body.fromDate="YYYY-MM-DDTHH:MM:SSZ"  
                // năm, tháng, ngày, giờ, phút, giây
                let from = req.body.fromDate;
                let to = req.body.toDate;
            //     let [ fromYear, fromMonth, fromDay, fromHours] = from.split('-');
            //     let [ toYear, toMonth, toDay, toHours] = to.split('-');
            //     let fromD = new Date(fromYear, fromMonth, fromDay, fromHours);
            //     let toD = new Date(toYear, toMonth, toDay, toHours);
                let fromD = new Date(from);
                let toD = new Date(to);
                req.body.fromDate= fromD;
                req.body.toDate= toD;
                const newBooking = new Booking(

                    req.body
                );
     
                //Save to DB
                const savedBooking = await newBooking.save();
                if (req.body.bookedBy){
                      const user = await User.findById(req.body.bookedBy);
                      await user.updateOne({ $push: { bookings: savedBooking._id  }});
                }
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
      },
      deleteBooking : async (req,res)=> {
            try{
                  await User.updateMany({bookings: req.params.id} , { $pull: { bookings: req.params.id}})
                  await Booking.findByIdAndDelete(req.params.id);
                  res.status(200).json("Deleted successfully");
            }catch(err){
                  res.status(500).json(err)
            }
      }

}
module.exports = BookingController;