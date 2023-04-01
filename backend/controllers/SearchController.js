const RoomType = require('../models/RoomTypeModel');
const Branch = require('../models/BranchModel');
const Booking = require('../models/BookingModel');
const Hotel = require('../models/HotelModel');
const SearchController = {
       searchByDate: async(req, res) => {
   

        try{
            //2023-10-01T14:00:00Z
            //2023-10-01T17:00:00Z
          //   /api/v1/hotel/search/date?cityName=   &fromDate=  &toDate=  &num=
           const cityName  = req.query.cityName;
           const from = req.query.fromDate;
           const to = req.query.toDate;
          const fromDate = new Date(from);
           const toDate = new Date(to)
           const num = req.query.num;
           const br = await Branch.findOne({ cityName: cityName});
           let bookings = await Booking.find({
            $or: [
               { fromDate: { $gte: fromDate, $lte: toDate } },
               { toDate: { $gte: fromDate, $lte: toDate } }
           ],
           
            branch: br._id,
          numberOfGuest: num
        })

       
    // res.status(200).json(bookings);
       
        let hotel = await Hotel.find({ branch: br._id});
  
    //If no date availble in bookings
    if (bookings.length === 0) {
       //1
        async function getAvRoom(temp){
            let promises = Promise.all(temp.map( async (r) => {   
                     let room = await RoomType.findById(r);
                  //   if (room.numberOfPeople != num){
                    //        return {
                    //         room: room,
                    //         roomNumbers: []
                    //        }
                    //   }else{

                    
                         return {
                           room: room ,
                           roomNumbers: room.roomNumbers
                         };
                     }
            ))
            return await promises;
        }     
   //2
   let u= []
   let result = hotel.map(async(h) => {
       await getAvRoom(h.rooms).then(
           (m)=> {
               u.push(m)
           }
       )
   })

  await Promise.all(result)
  .then(
       (values)=>
       {
            res.status(200).json(u)
       }
    ) 
            
    
    
    
    
    
    
    
    
    
    
    
    
    
}
else{  
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
     //1    
    async function getAvRoom(temp){
             let promises = Promise.all(temp.map( async (r) => {   
                      let room = await Room.findById(r);
                    //   if (room.numberOfPeople != num){
                    //        return {
                    //         room: room,
                    //         roomNumbers: []
                    //        }
                    //   }else{
                      let rnArr = []
                      room.roomNumbers.forEach( r => {
                            if(!occRooms.includes(r)) {
                                rnArr.push(r)
                            }
                    })
                          return {
                            room: room ,
                            roomNumbers: rnArr
                          };
                      }
             ))
             return await promises;
                   
    }     
 
    let u= []
    let result = hotel.map(async(h) => {
        await getAvRoom(h.rooms).then(
            (m)=> {
                u.push(m)
            }
        )
    })

   await Promise.all(result)
   .then(
        (values)=>
        {
             res.status(200).json(u)
        }
     ) 
   

         

}
        
        
    } catch(err){
            res.status(500).json(err);
        }   
       },
   
};
module.exports = SearchController;