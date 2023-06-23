const Booking = require("../models/BookingModel");
const User = require("../models/UserModel");
const mongoose = require("mongoose");
const moment = require("moment");
const Room = require("../models/RoomModel");

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
      // [GET] /api/v1/booking/hotel/:hotelId
      getAllBooking: async (req, res) => {
            try{
                  let bookings
                  if (req.params.hotelId === 'ad') 
                        bookings = await Booking.find().sort({ createdAt: -1 }).populate('bookedBy').populate('hotel');
                  else bookings = await Booking.find({ hotel: req.params.hotelId }).sort({ createdAt: -1 }).populate('bookedBy').populate('hotel');
                  res.status(200).json(bookings);
            }catch(err){
                  res.status(500).json(err);
            }
      },
      // [GET] /api/v1/booking/byDate/:from/:to/:hotelId
      getBookingByDate: async (req, res) => {
            try{
                  // const date = new Date()
                  let bookings
                  if (req.params.hotelId === 'ad') 
                        bookings = await Booking.find({ fromDate: { $gte: req.params.from, $lte: req.params.to }}).sort({ createdAt: -1 }).populate('bookedBy').populate('hotel')
                  else bookings = await Booking.find({ hotel: req.params.hotelId, fromDate: { $gte: req.params.from, $lte: req.params.to }}).sort({ createdAt: -1 }).populate('bookedBy').populate('hotel')
                  res.status(200).json(bookings);
            }catch(err){
                  res.status(500).json(err);
            }
      },
      // [GET] /api/v1/booking/byDate/@:username/:from/:to/:hotelId
      getBookingByDateByName: async (req, res) => {
            try{
                  // const date = new Date()
                  const userId = await User.findOne({ username: req.params.username });
                  let bookings
                  if (req.params.hotelId === 'ad') 
                        bookings = await Booking.find({ bookedBy: userId, fromDate: { $gte: req.params.from, $lte: req.params.to } }).sort({ createdAt: -1 }).populate('bookedBy').populate('hotel')
                  else bookings = await Booking.find({ hotel: req.params.hotelId, bookedBy: userId, fromDate: { $gte: req.params.from, $lte: req.params.to } }).sort({ createdAt: -1 }).populate('bookedBy').populate('hotel')
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
      // [GET] /api/v1/booking/@:username/:hotelId
      getBookingByUser: async (req,res)=> {
            try{
                  const userId = await User.findOne({ username: req.params.username });
                  let bookings
                  if (req.params.hotelId === 'ad') {
                        // console.log(userId._id.toHexString())
                        bookings = await Booking.find({ bookedBy: userId }).sort({ createdAt: -1 }).populate('bookedBy').populate('hotel')
                  }
                  else bookings = await Booking.find({ bookedBy: userId, hotel: req.params.hotelId }).sort({ createdAt: -1 }).populate('bookedBy').populate('hotel')
                  res.status(200).json(bookings);
            }catch(err){
                  res.status(500).json(err);
            }
      },
      // [GET] /api/v1/booking/:userId/all
      getAllBookingByUser: async (req,res)=> {
            try{
                  const userId = await User.findById(req.params.userId);
                  let bookings
                  if (req.params.hotelId === 'ad') {
                        // console.log(userId._id.toHexString())
                        bookings = await Booking.find({ bookedBy: userId }).sort({ createdAt: -1 }).populate('bookedBy').populate('hotel')
                  }
                  else bookings = await Booking.find({ bookedBy: userId }).populate('bookedBy').populate('hotel')
                  res.status(200).json(bookings);
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
      },
      // [GET] /api/v1/booking/:userId/:hotelId
      checkExistUser: async (req, res)=> {
            try{
                  const isBooked = await Booking.find({ bookedBy: req.params.userId, hotel: req.params.hotelId })
                  let result = false
                  if (isBooked.length !== 0)
                        result = true
                  res.status(200).json(result);
            }catch(err){
                  res.status(500).json(err);
            }
      },
      // [GET] /api/v1/booking/hotel/:hotelId/distinct
      getDistinctUser: async (req, res)=> {
            try{
                  // specify the document field
                  const fieldName = "bookedBy";
                  // specify an optional query document
                  const query = { hotel: req.params.hotelId };
                  const distinctValues = await Booking.distinct(fieldName, query);
                  // const isBooked = await Booking.find({ hotel: req.params.id })
                  res.status(200).json(distinctValues);
            }catch(err){
                  res.status(500).json(err)
            }
      },
      // [GET] /api/v1/booking/hotel/:hotelId/:type/:code/:year/revenue
      getRevenueByDate: async (req, res)=> {
            try{
                  const hotelId = req.params.hotelId
                  // console.log(hotelId)
                  const now = new Date()
                  const month = now.getMonth()
                  let bookings, customers
                  let bookingArray = [], customerArray = []
                  // console.log(req.params.hotelId + ' ' + req.params.type + ' ' + req.params.code + ' ' + req.params.year)
                  if (req.params.type === 'all') {
                        bookings = await Booking.aggregate([
                              {     $match: { hotel: new mongoose.Types.ObjectId(hotelId) }      },
                              {
                                    $group: {
                                          "_id": { $dateToString: { format: "%m/%d/%Y", date: '$createdAt', timezone: "+07:00" } },
                                          "count": { $sum: 1 },
                                          "createdAt": { $push: "$createdAt" },
                                          "price": { $push: "$price" },
                                          "totalPrice": { $sum: "$price" }
                                    }
                              },
                              {
                                    $sort: {
                                          createdAt: 1
                                    }
                              },
                        ])
                        customers = await User.aggregate([
                              {
                                    $group: {
                                          "_id": { $week: "$createdAt" },
                                          "WeekValue": { $first: { $week: "$createdAt" } },
                                          "count": { $sum: 1 },
                                          "createdAt": { $push: "$createdAt"}
                                    }
                              },
                        ])
                        bookingArray = [...bookings]
                        customerArray = [...customers]
                  }
                  else if (req.params.type === 'week') {
                        bookings = await Booking.aggregate([
                              {     $match: { hotel: new mongoose.Types.ObjectId(hotelId) }      },
                              {
                                    $sort: {
                                          createdAt: 1
                                    }
                              },
                              {
                                    $group: {
                                          "_id": { $week: "$createdAt" },
                                          "WeekValue": { $first: { $week: "$createdAt" } },
                                          "count": { $sum: 1 },
                                          "createdAt": { $push: "$createdAt"},
                                          "price": { $push: "$price"},
                                          "totalPrice": { $sum: "$price" }
                                    }
                              }
                        ])
                        customers = await User.aggregate([
                              {
                                    $group: {
                                          "_id": { $week: "$createdAt" },
                                          "WeekValue": { $first: { $week: "$createdAt" } },
                                          "count": { $sum: 1 },
                                          "createdAt": { $push: "$createdAt"}
                                    }
                              },
                        ])
                        if (req.params.code === 'this-week') {
                              bookings.forEach((booking, index) => {
                                    if (booking.WeekValue === moment().week()) {
                                          bookingArray.push(booking)
                                    }
                              })
                              customers.forEach((customer, index) => {
                                    if (customer.WeekValue === moment().week()) {
                                          customerArray.push(customer)
                                    }
                              })
                        }
                        else if (req.params.code === 'prev-week') {
                              bookings.forEach((booking, index) => {
                                    if (booking.WeekValue === moment().week() - 1) {
                                          bookingArray.push(booking)
                                    }
                              })
                              customers.forEach((customer, index) => {
                                    if (customer.WeekValue === moment().week() - 1) {
                                          customerArray.push(customer)
                                    }
                              })
                        }
                  }
                  else if (req.params.type === 'month') {
                        let monthArray = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
                        // console.log(req.params.code + ' ' + req.params.year)
                        bookings = await Booking.aggregate([
                              {     $match: { hotel: new mongoose.Types.ObjectId(hotelId) }      },
                              {
                                    $project: {
                                          year: { $year: "$createdAt" },
                                          month: { $month: "$createdAt" },
                                          createdAt: 1,
                                          price: 1
                                    }
                              },
                              {
                                    $sort: {
                                          createdAt: 1
                                    }
                              },
                              {
                                    $group: {
                                          "_id": { month: "$month", year: "$year" },
                                          "MonthValue": { $first: { $month: "$createdAt" } },
                                          "YearValue": { $first: { $year: "$createdAt" } },
                                          "count": { $sum: 1 },
                                          "createdAt": { $push: "$createdAt"},
                                          "price": { $push: "$price"},
                                          "totalPrice": { $sum: "$price" }
                                    }
                              }
                        ])
                        // console.log(bookings)
                        customers = await User.aggregate([
                              {
                                    $project: {
                                          year: { $year: "$createdAt" },
                                          month: { $month: "$createdAt" },
                                          createdAt: 1,
                                          price: 1
                                    }
                              },
                              {
                                    $group: {
                                          "_id": { month: "$month", year: "$year" },
                                          "MonthValue": { $first: { $month: "$createdAt" } },
                                          "YearValue": { $first: { $year: "$createdAt" } },
                                          "count": { $sum: 1 },
                                          "createdAt": { $push: "$createdAt"}
                                    }
                              },
                        ])
                        if (req.params.code === 'this-month') {
                              bookings.forEach((booking, index) => {
                                    if (booking.MonthValue === month + 1) {
                                          bookingArray.push(booking)
                                    }
                              })
                              customers.forEach((customer, index) => {
                                    if (customer.MonthValue === month + 1) {
                                          customerArray.push(customer)
                                    }
                              })
                        }
                        else {
                              bookings.forEach((booking, index) => {
                                    if (booking.MonthValue === monthArray.indexOf(req.params.code) + 1 && booking.YearValue === parseInt(req.params.year)) {
                                          bookingArray.push(booking)
                                    }
                              })
                              customers.forEach((customer, index) => {
                                    if (customer.MonthValue === monthArray.indexOf(req.params.code) + 1 && customer.YearValue === parseInt(req.params.year)) {
                                          customerArray.push(customer)
                                    }
                              })
                        }
                  }
                  else if (req.params.type === 'quarter') {
                        bookings = await Booking.aggregate([
                              {     $match: { hotel: new mongoose.Types.ObjectId(hotelId) }      },
                              {
                                    $sort: {
                                          createdAt: 1
                                    }
                              },
                              {
                                    $group: {
                                          "_id": { $month: "$createdAt" },
                                          "MonthValue": { $first: { $month: "$createdAt" } },
                                          "YearValue": { $first: { $year: "$createdAt" } },
                                          "count": { $sum: 1 },
                                          "createdAt": { $push: "$createdAt"},
                                          "price": { $push: "$price"},
                                          "totalPrice": { $sum: "$price" }
                                    }
                              }
                        ])
                        customers = await User.aggregate([
                              {
                                    $group: {
                                          "_id": { $month: "$createdAt" },
                                          "MonthValue": { $first: { $month: "$createdAt" } },
                                          "YearValue": { $first: { $year: "$createdAt" } },
                                          "count": { $sum: 1 },
                                          "createdAt": { $push: "$createdAt"}
                                    }
                              },
                        ])
                        let quarter = [
                              [1, 2, 3],
                              [4, 5, 6],
                              [7, 8, 9],
                              [10, 11, 12]
                        ]
                        if (req.params.code === 'this-quarter') {
                              quarter.forEach((q, index) => {
                                    if (q.includes(month + 1)) {
                                          q.forEach((m, index) => {
                                                const r = bookings.find((booking) => {
                                                      return m === booking.MonthValue
                                                })
                                                const p = customers.find((customer) => {
                                                      return m === customer.MonthValue
                                                })
                                                if (r)
                                                      bookingArray.push(r)
                                                if (p)
                                                      customerArray.push(p)
                                          })
                                    }
                              })
                        }
                        else {
                              quarter[req.params.code - 1].forEach((m, index) => {
                                    const r = bookings.find((booking) => {
                                          return m === booking.MonthValue && booking.YearValue === parseInt(req.params.year)
                                    })
                                    const p = customers.find((customer) => {
                                          return m === customer.MonthValue && customer.YearValue === parseInt(req.params.year)
                                    })
                                    if (r)
                                          bookingArray.push(r)
                                    if (p)
                                          customerArray.push(p)
                              })
                        }
                  }
                  res.status(200).json({
                        data: {
                              bookingArray,
                              customerArray
                        }
                  });
            }catch(err){
                  res.status(500).json(err);
            }
      },
      // [GET] /api/v1/booking/abc
      // getExpiredBooking: async (req, res)=> {
      //       // const collectionBooking = context.services.get("Cluster0").db("test").collection("bookings");
      //       // const collectionRoom = context.services.get("Cluster0").db("test").collection("rooms");
      //       try {
      //             const bookings = await Booking.find({toDate: { $lt: new Date() }})
      //             bookings.forEach(async (booking, index) => {
      //                   const res = await Room.findOne({ _id: booking.room, bookedBy: booking._id });
      //                   if (res) console.log(res)
      //             })
      //       } catch (err) {
      //             console.error("Field update failed", err)
      //       }

      // },
}
module.exports = BookingController;