const Doctor = require("../models/Doctor");


const AddDoctor = async(req, res, next)=>{
    try {
      const {name, role, biography, epxperience, fee } = req.body;
      const file = req?.file
  
      const newDoctor  = new Doctor({
          name,
          role,
          biography,
          epxperience,
          fee,
          file:file?.filename
      });
      
      if(!newDoctor){
          return res.status(400).json({message:'Empty fields not allowed!'})
      }
      if(newDoctor){
          await newDoctor.save()
          return res.status(201).json({message:'Inserted successfully', user:req.email, })
      }
    } catch (error) {
      console.log(error)
    }
      
  }

  const UpdateDoctor= async(req, res, next) =>{
    try {
        const {name, role, biography, epxperience, fee } = req.body;
        const file = req?.file

        const dataToUpdate = {
            name,
            role,
            biography,
            epxperience,
            fee,
            file,
        }
        const updatedData = await Appointment.findByIdAndUpdate(id, {$set:dataToUpdate})

        if(!updatedData){
            return res.status(400).json({message:"Doctor faild to update"})
        }
        if(updatedData){
            return res.status(200).json({message:"Doctor updated successfully"})
        }
    } catch (error) {
        
    }
  }

  const DeleteDoctor = async(req, res, nesxt) =>{
    try {
        const id = req.params.id;

        const dataToDelete = await Doctor.findByIdAndDelete(id)
    
        if(!dataToDelete){
            return res.status(404).json({message:'Data to be deleted not found'})
        }
    
        if(dataToDelete){
            return res.status(200).json({message:'Doctor  deleted successfully'})
        }
    } catch (error) {
        console.log(error)
    }
  }

  const FetchAllDoctor = async(req, res, next) =>{
    try {
        const doctor = await Doctor.find()

    if(!doctor ){
        return res.status(404).json({message:'Data not found'})
    }
    if(doctor){
        return res.status(200).json({message:'doctor fetched successfully', doctor :doctor})
    }
    } catch (error) {
        console.log(error)
    }
  }

  const FetchSingleDoctor = async(req, res, next)=>{
    try {
        const {id} = req.params;
        const doctor = await Doctor.findById(id)

    if(!doctor ){
        return res.status(404).json({message:'Data not found'})
    }
    if(doctor ){
        return res.status(200).json({message:'doctor fetched successfully', doctor :doctor})
    }
    } catch (error) {
        console.log(error)
    }
  }



  module.exports = {AddDoctor,UpdateDoctor, DeleteDoctor, FetchAllDoctor, FetchSingleDoctor}