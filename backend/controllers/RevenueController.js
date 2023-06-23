const Hotel = require("../models/HotelModel");
const Services = require("../models/ServicesModel");
const Branch = require("../models/BranchModel");
const Revenue = require("../models/RevenueModel");

const RevenueController = {
   // [GET] /api/v1/revenue
   getRevenue: async (req, res)=> {
      try{
         const revenue = await Revenue.find()
         res.status(200).json(revenue);
      }catch(err){
         res.status(500).json(err);
      }
   },
   // [GET] /api/v1/revenue/:id
   getHotelRevenue: async (req, res)=> {
      try{
         const revenue = await Revenue.findOne({ hotelId: req.params.id })
         res.status(200).json(revenue);
      }catch(err){
         res.status(500).json(err);
      }
   },
   // [POST] /api/v1/revenue/:id
   uploadRevenue: async (req, res)=> {
      try{
         const newHotel = new Revenue(req.body);
         const savedHotel = await newHotel.save();
         // if (req.body.hotel){
         //    const branch = await Branch.findById(req.body.branch);
         //    await branch.updateOne( {$push: { rooms: savedHotel._id }});
         // }
         res.status(200).json(savedHotel);
      } catch(err){
         res.status(500).json(err);
      }
   },
   // [PUT] /api/v1/revenue/:id
   updateRevenue: async (req, res)=> {
      try{
         const hotel = await Revenue.findOne({ hotelId: req.params.id });
         await hotel.updateOne({ $set: req.body })
         res.status(200).json("Updated successfully");
      } catch(err){
         res.status(500).json(err);
      }
   },
};
module.exports = RevenueController;