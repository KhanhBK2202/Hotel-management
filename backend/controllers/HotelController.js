const Hotel = require("../models/HotelModel");


export const HotelController = {
    uploadHotel: async (req, res)=> {
          try{
              
          }catch(err){
             res.status.json(err);
          }
    },
    updateHotel: async (req, res)=> {
      try{
          
      }catch(err){
         res.status.json(err);
      }
    },
    deleteHotel:  async (req, res)=> {
      try{
          
      }catch(err){
         res.status.json(err);
      }
   
   },
    getService:  async (req, res)=> {
      try{
          const services = await Hotel.findById(req.params.id);
          res.status(200).json(services);

      }catch(err){
         res.status.json(err);
      }
    },
    getComment:  async (req, res)=> {
      try{
          
      }catch(err){
         res.status.json(err);
      }
    }

};