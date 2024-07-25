const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const MedicineSchema = new Schema({
    name:{
        type:String,
    },
}, { timestamps: true })

const Medicine = mongoose.model("Medicine", MedicineSchema)
module.exports = Medicine;