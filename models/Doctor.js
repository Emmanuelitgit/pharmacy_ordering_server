const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
    name:{
        type:String,
    },
    role:{
        type:String
    },
    biography:{
        type:String
    },
    epxperience:{
        type:Number
    },
    fee:{
        type:Number
    },
    file:{
        type:String
    },
}, { timestamps: true })

const Doctor = mongoose.model("Doctor", DoctorSchema)
module.exports = Doctor;