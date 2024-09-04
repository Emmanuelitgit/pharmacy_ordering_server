const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

const AddAppointment = async(req, res, next)=>{
    try {
      const {doctor_id, date, time, status} = req.body;
  
      const newAppointment  = new Appointment({
          doctor_id,
          date,
          time,
          status,
          user:req?.email,
      });
      
      if(!newAppointment){
          return res.status(400).json({message:'Empty fields not allowed!'})
      }
      if(newAppointment){
          await newAppointment.save()
          return res.status(201).json({message:'Inserted successfully', user:req.email, })
      }
    } catch (error) {
      console.log(error)
    }
      
  }

  const UpdateAppointment= async(req, res, next) =>{
    try {
        const {doctor_id, date, time, status} = req.body;
        const id = req.params.id

        const dataToUpdate = {
            doctor_id,
            date,
            time,
            status,
            user:req?.email,
        }
        const updatedData = await Appointment.findByIdAndUpdate(id, {$set:dataToUpdate})

        if(!updatedData){
            return res.status(400).json({message:"Appointment faild to update"})
        }
        if(updatedData){
            return res.status(200).json({message:"Appointment updated successfully", user:req.email})
        }
    } catch (error) {
        
    }
  }

  const DeleteAppointment = async(req, res, nesxt) =>{
    try {
        const id = req.params.id;

        const dataToDelete = await Appointment.findByIdAndDelete(id)
    
        if(!dataToDelete){
            return res.status(404).json({message:'Data to be deleted not found'})
        }
    
        if(dataToDelete){
            return res.status(200).json({message:'Appointment  deleted successfully', user:req.email})
        }
    } catch (error) {
        console.log(error)
    }
  }

  const FetchAllAppointment = async(req, res, next) =>{
    try {
        const appointment = await Appointment.find()

    if(!appointment ){
        return res.status(404).json({message:'Data not found'})
    }
    if(appointment){
        return res.status(200).json({message:'Appointment fetched successfully', appointment :appointment , user:req.email})
    }
    } catch (error) {
        console.log(error)
    }
  }

  const FetchSingleAppointment = async(req, res, next)=>{
    try {
        const user = req?.email;
        const appointment = await Appointment.find({ user: user }).populate('doctor');

    if(!appointment ){
        return res.status(404).json({message:'Data not found'});
    }
    if(appointment ){
        return res.status(200).json({message:'Appointment fetched successfully', appointment:appointment , user:req.email})
    }
    } catch (error) {
        console.log(error)
    }
  }



  module.exports = {AddAppointment,UpdateAppointment, DeleteAppointment, FetchAllAppointment, FetchSingleAppointment}