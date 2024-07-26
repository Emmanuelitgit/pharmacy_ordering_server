const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    medicine_id:{
        type:String,
    },
    quantity:{
        type:Number
    },
    user:{
        type:String
    },
    name:{
        type:String
    }
}, { timestamps: true })

const Order = mongoose.model("Order", OrderSchema)
module.exports = Order;