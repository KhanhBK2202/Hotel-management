const Branch = require("../models/BranchModel");


export const BranchController = {
      uploadInfo: async (req,res)=> {
            try{
                
                   
                const newBranch = await new Branch({
                          image: req.body.image,
                          cityName: req.body.cityName,
                          hotelId: req.body.hotelId._id,
                          managerId: req.body.managerId._id
                });
     
                //Save to DB
                const branch = await newBranch.save();
                res.status(200).json(branch);
            }
            catch(err){
                res.status(500).json(err);
            }
       },
       getInfo: async (req,res)=>{
        
            try{
                  const branch = await Branch.find();
                  res.status(200).json(branch);
    
            }catch(err){
                 res.status(500).json(err);
            }
    
       },
       




};