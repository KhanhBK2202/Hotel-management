const RoomType = require("../models/RoomTypeModel");
const Hotel = require("../models/HotelModel");
const User = require("../models/UserModel");

const RoomTypeController = {
      createType: async (req, res, next)=> {
         // try{
            //   const newRoom = new Room({
            //    roomNumbers: req.body.roomNumbers,
            //    images: req.body.images,
            //    priceHour: req.body.priceHour,
            //    priceNextHour: req.body.priceNextHour,
            //    priceOverNight: req.body.priceOverNight,
            //    numOfPeople: req.body.numOfPeople

            //   });
            const newRoom = new RoomType(req.body);
            // newRoom 
            //    .save()
            //    .then(() => res.send('successfully'))
            //    .catch(next)
            const savedRoom = await newRoom.save();
            if (req.body.hotel){
               const hotel = await Hotel.findById(req.body.hotel);
               await hotel.updateOne( {$push: { rooms: savedRoom._id }});
            }
            res.status(200).json(savedRoom);

         // } catch(err){
         //    res.status(500).json(err);
         // }
      },
    updateRoom: async (req, res)=> {
      try{
        const id = req.params.id;
        const room = await RoomType.findById(id);
        await room.updateOne({ $set: req.body })
        res.status(200).json("Updated successfully");
      }catch(err){
         res.status(500).json(err);
      }
    },
   getAllRoom:  async (req, res)=> {
      try{
         const rooms = await RoomType.find().populate('hotel')
         res.status(200).json(rooms);
      }catch(err){
         res.status(500).json(err);
      }
   },
   getRoom: async (req, res) => {
      try {
         const room = await RoomType.findById(req.params.roomId).populate('hotel')
         res.status(200).json(room);
      } catch(err){
         res.status(500).json(err);
      }
   },
    deleteRoom:  async (req, res)=> {
      try{
          await User.updateMany({ favRooms: req.params.id}, { $pull: { favRooms: req.params.id}})
          await Hotel.updateMany({ rooms: req.params.id}, { $pull: { rooms: req.params.id}})
          await RoomType.findByIdAndDelete(req.params.id);
          res.status(200).json("Deleted successfully");
      }catch(err){
         res.status(500).json(err);
      }
   
   } 
   

};
module.exports = RoomTypeController;