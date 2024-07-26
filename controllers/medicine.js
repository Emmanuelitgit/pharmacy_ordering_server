const Medicine = require("../models/Medicine");


const AddMedicine = async(req, res, next)=>{
    try {
      const {name} = req.body;
      const file = req.file;
  
      const newMedicine = new Medicine({
          name,
          file:file?.filename
      });
      
      if(!newMedicine){
          return res.status(400).json({message:'Empty fields not allowed!'})
      }
      if(newMedicine){
          await newMedicine.save()
          return res.status(201).json({message:'Inserted successfully', user:req.email, file:file?.filename})
      }
    } catch (error) {
      console.log(error)
    }
      
  }

  const UpdateMedicine = async(req, res, next) =>{
    try {
        const {name, price, quantity, thumbnail} = req.body
        const id = req.params.id

        const dataToUpdate = {
            name,
            price,
            quantity,
            thumbnail
        }
        const updatedData = await Medicine.findByIdAndUpdate(id, {$set:dataToUpdate})

        if(!updatedData){
            return res.status(400).json({message:"Medicine faild to update"})
        }
        if(updatedData){
            return res.status(200).json({message:"Medicine updated successfully", user:req.email})
        }
    } catch (error) {
        
    }
  }

  const DeleteMedicine = async(req, res, nesxt) =>{
    try {
        const id = req.params.id;

        const dataToDelete = await Medicine.findByIdAndDelete(id)
    
        if(!dataToDelete){
            return res.status(404).json({message:'Data to be deleted not found'})
        }
    
        if(dataToDelete){
            return res.status(200).json({message:'Medicine deleted successfully', user:req.email})
        }
    } catch (error) {
        console.log(error)
    }
  }

  const FetchAllMedicine = async(req, res, next) =>{
    try {
        const medicines = await Medicine.find()

    if(!medicines){
        return res.status(404).json({message:'Data not found'})
    }
    if(medicines){
        return res.status(200).json({message:'Medicine fetched successfully', medicines:medicines, user:req.email})
    }
    } catch (error) {
        console.log(error)
    }
  }

  const FetchSingleMedicine = async(req, res, next)=>{
    try {
        const {id} = req.params;
        const medicine = await Medicine.findById(id)

    if(!medicine){
        return res.status(404).json({message:'Data not found'})
    }
    if(medicine){
        return res.status(200).json({message:'Medicine fetched successfully', medicine:medicine, user:req.email})
    }
    } catch (error) {
        console.log(error)
    }
  }



  module.exports = {AddMedicine,UpdateMedicine, DeleteMedicine, FetchAllMedicine, FetchSingleMedicine}