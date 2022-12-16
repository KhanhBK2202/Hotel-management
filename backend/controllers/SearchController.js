//Search by Date

const Room = require('../models/RoomModel');
const Branch = require('../models/BranchModel');
export const SearchController = {
       searchByOverNight: async(req, res) => {

        try{

           var list = [];

           const {cityName, fromDate, toDate, numberOfPeople} = req.body;
           
           const room = await Room.find({
             $and:[{

             },

             {
               numberOf
             }

             ]
           })
           const branch = Branch.find({
               
           })
        }catch(err){
            res.status(500).json(err);
        }   
       },
       seacrhByHour: async(req, res)=>{
        try{

        }catch(err){

        }
       }
};
// {
//   cityName: "Ha Noi",
//   overNight: true,
//   number: 10
  
// }