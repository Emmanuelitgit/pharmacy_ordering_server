const Doctor = require("../models/Doctor");

 /**
   * @description this method is used to save new doctor records.
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   * @date
   */
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
          file:file?.filename,
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
        return res.status(500).json({message:'Faild to add doctor records'})
    }
      
  }

  /**
   * @description this method is used to update doctor records.
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   * @date
   */
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
        console.log(error)
        return res.status(500).json({message:'Faild to update doctor records'})
    }
  }

   /**
   * @description this method is used to remove doctor records given the doctor id.
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   * @date
   */
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
        return res.status(500).json({message:'Faild to delete doctor records'})
    }
  }

   /**
   * @description this method is used to fetch all doctors and their records.
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   * @date
   */
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
        return res.status(500).json({message:'Faild to fetch records'})
    }
  }

   /**
   * @description this method is used to fetch a doctor records given the doctor id.
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   * @returns 
   * @date
   */
  const FetchDoctorById = async(req, res, next)=>{
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
        return res.status(500).json({message:'Faild to fetch doctor records'})
    }
  }



  module.exports = {AddDoctor,UpdateDoctor, DeleteDoctor, FetchAllDoctor, FetchDoctorById}