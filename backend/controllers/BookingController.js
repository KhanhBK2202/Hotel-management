const Booking = require("../models/BookingModel");
const User = require("../models/UserModel");
const moment = require("moment");

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
      // [PUT] /api/v1/booking/image/:bookingCode
      uploadImage: async (req, res) => {
            try {
                  const uploadInfo = await Booking.findOneAndUpdate({ bookingCode: req.params.bookingCode }, { $set: req.body })
                  res.status(200).json(uploadInfo);
            }
            catch(err){
                  res.status(500).json(err);
            }
      },
      getAllBooking: async (req, res) => {
            try{
                  const bookings = await Booking.find().sort({ createdAt: -1 }).populate('bookedBy').populate('hotel');
                  res.status(200).json(bookings);
            }catch(err){
                  res.status(500).json(err);
            }
      },
      getBookingByDate: async (req, res) => {
            try{
                  // const date = new Date()
                  const bookings = await Booking.find({ fromDate: { $gte: req.params.from, $lte: req.params.to }}).sort({ createdAt: -1 }).populate('bookedBy')
                  res.status(200).json(bookings);
            }catch(err){
                  res.status(500).json(err);
            }
      },
      getBookingByDateByName: async (req, res) => {
            try{
                  // const date = new Date()
                  const userId = await User.findOne({ username: req.params.username });
                  const bookings = await Booking.find({ bookedBy: userId, fromDate: { $gte: req.params.from, $lte: req.params.to } }).sort({ createdAt: -1 }).populate('bookedBy')
                  res.status(200).json(bookings);
            }catch(err){
                  res.status(500).json(err);
            }
      },
      getPastBooking: async (req, res) => {
            try{
                  const date = new Date()
                  const bookings = await Booking.find({ bookedBy: req.params.id, toDate: { $lt: date } });
                  res.status(200).json(bookings);
            }catch(err){
                  res.status(500).json(err);
            }
      },
      getUpcomingBooking: async (req, res) => {
            try{
                  const date = new Date()
                  const bookings = await Booking.find({ bookedBy: req.params.id, fromDate: { $gt: date } });
                  res.status(200).json(bookings);
            }catch(err){
                  res.status(500).json(err);
            }
      },
      getPresentBooking: async (req, res) => {
            try{
                  const date = new Date()
                  const bookings = await Booking.find({ bookedBy: req.params.id, fromDate: { $lte: date }, toDate: { $gte: date } });
                  res.status(200).json(bookings);
            }catch(err){
                  res.status(500).json(err);
            }
      },
      getBooking: async (req, res)=> {
            try{
                  const booking = await Booking.findOne({ bookingCode: req.params.id }).populate('room')
                  res.status(200).json(booking);
      
            }catch(err){
                  res.status(500).json(err);
            }
      },
      getBookingByUser: async (req,res)=> {
            try{
                  const userId = await User.findOne({ username: req.params.username });
                  const booking = await Booking.find({ bookedBy: userId }).sort({ createdAt: -1 }).populate('bookedBy')
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
            } catch(err){
                  res.status(500).json(err)
            }
      }

}
module.exports = BookingController;