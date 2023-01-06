const Room = require("../models/RoomModel");
const Hotel = require("../models/HotelModel");

export const HotelController = {
    uploadRoom: async (req, res)=> {
          try{
              const newRoom = new Room(req.body);
              const savedRoom = await newRoom.save();
              if (req.body.hotel){
                  const hotel = await Hotel.findById(req.body.hotel);
                  await hotel.updateOne( {$push: { rooms: savedRoom._id }});
              }
              res.status(200).json(savedRoom);

          }catch(err){
             res.status(500).json(err);
          }
    },
    updateRoom: async (req, res)=> {
      try{
        const id = req.params.id;
        const room = await Room.findById(id);
        await room.updateOne({ $set: req.body })
        res.status(200).json("Updated successfully");
      }catch(err){
         res.status(500).json(err);
      }
    },
    getAllRoom:  async (req, res)=> {
      try{
          const rooms = await Room.find();
          res.status(200).json(rooms);
      }catch(err){
         res.status(500).json(err);
      }
   
   },
    getRoom:  async (req, res)=> {
      try{
          const room = await Room.findById(req.params.id);
          res.status(200).json(room);

      }catch(err){
         res.status(500).json(err);
      }
    },
   

};