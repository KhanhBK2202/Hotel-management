const Hotel = require("../models/HotelModel");
const Branch = require("../models/BranchModel");
const Room = require("../models/RoomModel");

const HotelController = {
    uploadHotel: async (req, res)=> {
          try{
            const newHotel = new Hotel(req.body);
            const savedHotel = await newHotel.save();
            if (req.body.hotel){
                const branch = await Branch.findById(req.body.branch);
                await branch.updateOne( {$push: { rooms: savedHotel._id }});
            }
            res.status(200).json(savedHotel);
          }catch(err){
             res.status.json(err);
          }
    },
    updateHotel: async (req, res)=> {
      try{
         const id = req.params.id;
         const hotel = await Hotel.findById(id);
         await hotel.updateOne({ $set: req.body })
         res.status(200).json("Updated successfully");
       }catch(err){
          res.status(500).json(err);
       }
    },
    deleteHotel:  async (req, res)=> {
      try{
          await Room.updateMany({  hotel: req.params.id}, { hotel : null})
          await Branch.updateMany({ hotels: req.params.id}, { $pull: { hotels: req.params.id}})
          await Hotel.findByIdAndDelete(req.params.id);
          res.status(200).json("Deleted successfully");
      }catch(err){
         res.status(500).json(err);
      }
   
   },
    getService:  async (req, res)=> {
      try{
          const result = await Hotel.find({ _id: req.params.id},{ services: 1  });
          res.status(200).json(result);

      }catch(err){
         res.status.json(err);
      }
    },
    // get comment of specific hotel
    getComment:  async (req, res)=> {
      try{
         const result = await Hotel.find({ _id: req.params.id},{ reviews: 1  });
         res.status(200).json(result);
      }catch(err){
         res.status(500).json(err);
      }
    },
    getAllHotel:  async (req, res)=> {
      try{
          const hotels = await Hotel.find();
          res.status(200).json(hotels);
      }catch(err){
         res.status(500).json(err);
      }
   
   },
    getHotel:  async (req, res)=> {
      try{
          const hotel = await Hotel.findById(req.params.id);
          res.status(200).json(hotel);

      }catch(err){
         res.status(500).json(err);
      }
    },

};
module.exports = HotelController;