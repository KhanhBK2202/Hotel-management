

const Room = require('../models/RoomModel');
const Branch = require('../models/BranchModel');
const Booking = require('../models/BookingModel');
const Hotel = require('../models/HotelModel');
const SearchController = {
       searchByDate: async(req, res) => {
   

        try{

          //   /api/v1/hotel/search/date?cityName=   &fromDate=  &toDate=  &num=
           const cityName  = req.query.cityName;
           const fromDate = req.query.fromDate;
           const toDate = req.query.toDate;
           const num = req.query.num;
           const br = await Branch.findOne({ cityName: cityName});
           let bookings = await Booking.find({
            $or: [
                { from: { $gte: fromDate, $lte: toDate } },
                { to: { $gte: fromDate, $lte: toDate } }
            ],
            branch: br._id,
            numOfPeople: { $gte: num }
        })

        let result = []

        let hotel = await Hotel.findOne({ branch: br._id});

        // If there are no bookings for these dates, 
        // return all rooms
   
        if (bookings.length === 0) {
            let result = []
            result = hotel.rooms.map(async r => {
                let room = await Room.findById(r)
                return {
                    room: room,
                    roomNumbers: room.roomNumbers
                }
            })
            res.status(200).json(result);
            
        }else{
          
          let map = new Map()
          let occRooms = []
          bookings.forEach(b => {
              let k = b.hotel.toString()
              let c = map.has(k) ? map.get(k) : new Set()
              b.roomNumbers.forEach(r => c.add(r))
              b.roomNumbers.forEach(r => occRooms.push(r))
              map.set(k, c)
              return b.hotel
          })

          result = hotel.rooms.map(async r => {
              let room = await Room.findById(r)
              let rnArr = []
              room.roomNumbers.forEach(r => {
                  if(!occRooms.includes(r)) {
                      rnArr.push(r)
                  }
              })
              return {
                  room: room,
                  roomNumbers: rnArr
              }
          })
           res.status(200).json(result);
        }
        
        }catch(err){
            res.status(500).json(err);
        }   
       },
      //  seacrhByHour: async(req, res)=>{
      //   try{
      //        //  api/v1/room/search/hour?cityName=   &startDate=  &startHour=  &numOfHour=    &num=  
      //        const cityName = req.query.cityName;
      //        const startHour = req.query.startHour;
      //        const numOfHour = req.query.numOfHour;
      //        const num = req.query.num;
      //        const br = await Branch.findOne({  cityName: cityName });
             
      //   }catch(err){
      //         res.status(500).json(err);
      //   }
      //  }
};
module.exports = SearchController;