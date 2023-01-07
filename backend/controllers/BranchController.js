const Branch = require("../models/BranchModel");
const BranchController = {
      uploadBranch: async (req,res)=> {
            try{
                
                   
                const newBranch = new Branch(req.body);
     
                //Save to DB
                const savedBranch = await newBranch.save();
                res.status(200).json(savedBranch);
            }
            catch(err){
                res.status(500).json(err);
            }
       },
       updateBranch: async (req,res)=>{
             try{
               const id = req.params.id;
               const branch = await Branch.findById(id);
               await branch.updateOne({ $set: req.body })
               res.status(200).json("Updated successfully");
             }
             catch(err){
               res.status(500).json(err);
             }
       },
       getAllBranch: async (req,res)=>{
        
            try{
                  const branch = await Branch.find();
                  res.status(200).json(branch);
    
            }catch(err){
                 res.status(500).json(err);
            }
    
       },
       getBranch: async (req,res)=>{
        
          try{
                const branch = await Branch.findById(req.params.id);
                res.status(200).json(branch);
  
          }catch(err){
               res.status(500).json(err);
          }
  
     },
     
       




};
module.exports = BranchController;