//Search by Date

const Room = require('../models/RoomModel');
const Branch = require('../models/BranchModel');
const Booking = require('../models/BookingModel');
export const SearchController = {
       searchByOverNight: async(req, res) => {
     // get list room id from branch
     // get list room matches number of people
    // 
        try{

          // ./api/hotel/search/?cityName=   &fromDate=  &toDate=  &num=
       //     const cityName  = req.query.cityName;
       //     const fromDate = req.query.fromDate;
       //     const toDate = req.query.toDate;
           const num = req.query.num;
           const rooms = await Room.find({numberOfGuest: num}).populate('branch booking');
           return res.status(200).json(rooms);

        
        }catch(err){
            res.status(500).json(err);
        }   
       },
       // seacrhByHour: async(req, res)=>{
       //  try{

       //  }catch(err){

       //  }
       // }
};
// {
//   cityName: "Ha Noi",
//   overNight: true,
//   number: 10
  
// }