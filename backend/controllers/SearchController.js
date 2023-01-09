

const Room = require('../models/RoomModel');
const Branch = require('../models/BranchModel');
const Booking = require('../models/BookingModel');
const Hotel = require('../models/HotelModel');
const SearchController = {
       searchByDate: async(req, res) => {
   

        try{
     
          //   /api/v1/hotel/search/date?cityName=   &fromDate=  &toDate=  &num=
           const cityName  = req.query.cityName;
           const from = req.query.fromDate;
           const to = req.query.toDate;
           const fromDate = new Date(from);
           const toDate = new Date(to);
           const num = req.query.num;
           const br = await Branch.findOne({ cityName: cityName});
           let bookings = await Booking.find({
            $or: [
                { from: { $gte: fromDate, $lte: toDate } },
                { to: { $gte: fromDate, $lte: toDate } }
            ],
            branch: br._id,
            numOfPeople: num//{ $gte: num }
        })

        let result = []
        
        //list of hotel of 1 branch based on cityName
        let hotel = await Hotel.find({ branch: br._id});
        

        // If there are no bookings for these dates, 
        // return all rooms
   
        if (bookings.length === 0) {
            let result = []
            for(let i = 0; i<hotel.length;i++){

                let listHotel = []
                listHotel = hotel[i].rooms.map(async r => {
                     let room = await Room.findById(r)
                     return {
                         room: room,
                         roomNumbers: room.roomNumbers
                     }
            })
                result = result.concat(listHotel);

        }
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
          for(let i =0; i<hotel.length;i++){
            let lis = [];
            lis = hotel[i].rooms.map(async r => {
              let room = await Room.findById(r)
              if (room.numOfPeople != num){
                      return{
                        room:room,
                        roomNumbers: []
                      }
              }else{
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
             }   
            })
        
              result = result.concat(lis);
          }

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