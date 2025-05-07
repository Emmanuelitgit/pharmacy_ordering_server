const mongoose = require("mongoose")

const Schema = mongoose.Schema;

/**
   * @description this model is used to map to the Medicine entities in the database.
   * @date
   */
const MedicineSchema = new Schema({
    name:{
        type:String,
    },
    file:{
        type:String
    },
    price:{
        type:Number
    }
}, { timestamps: true })

const Medicine = mongoose.model("Medicine", MedicineSchema)
module.exports = Medicine;