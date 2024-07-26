const Order = require("../models/Order");
const Medicine = require("../models/Medicine")

const PlaceOrder = async(req, res, next)=>{
    try {
      const {medicine_id, quantity} = req.body;

      const medicine = await Medicine.findById(medicine_id)

      if(!medicine){
        return res.status(400).json("error getting medicine")
      }
  
      const newOrder = new Order({
          medicine_id:medicine_id,
          quantity:quantity,
          user:req.email,
          name:medicine.name
      });
      
      if(!newOrder){
          return res.status(400).json({message:'Empty fields not allowed!'})
      }
      if(newOrder){
          await newOrder.save()
          return res.status(201).json({message:'Order placed successfully', user:req.email})
      }
    } catch (error) {
      console.log(error)
    }
      
  }

  const FetchAllOrders = async(req, res, next) =>{
    try {
        const orders = await Order.find()

    if(!orders){
        return res.status(404).json({message:'Data not found'})
    }
    if(orders){
        return res.status(200).json({message:'Orders fetched successfully', orders:orders, user:req.email})
    }
    } catch (error) {
        console.log(error)
    }
  }



  module.exports = {PlaceOrder, FetchAllOrders}