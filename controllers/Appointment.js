const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");


/**
   * @description this method is used to save new appointment record.
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   * @date
   */
const AddAppointment = async(req, res, next)=>{
    try {
      const {doctor, date, time, status} = req.body;
  
      const newAppointment  = new Appointment({
          doctor,
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
        return res.status(500).json({message:'Internal server error!'})
    }
      
  }


  /**
   * @description this method is used to update an appointment record.
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   * @date
   */
  const UpdateAppointment= async(req, res, next) =>{
    try {
        const {doctor, date, time, status} = req.body;
        const id = req.params.id

        const dataToUpdate = {
            doctor,
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
        console.log(error)
        return res.status(500).json({message:'Internal server error!'})
    }
  }


    /**
   * @description this method is used to remove an appointment record given the record id.
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   * @date
   */
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
        return res.status(500).json({message:'Internal server error!'})
    }
  }


    /**
   * @description this method is used to appointments and thier records.
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   * @date
   */
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
        return res.status(500).json({message:'Internal server error!'})
    }
  }


   /**
   * @description this method is used to appointment records for a given user.
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   * @date
   */
  const FetchAppointmentByUserEmail = async(req, res, next)=>{
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
        return res.status(500).json({message:'Internal server error!'})
    }
  }



  module.exports = {AddAppointment,UpdateAppointment, DeleteAppointment, FetchAllAppointment, FetchAppointmentByUserEmail}