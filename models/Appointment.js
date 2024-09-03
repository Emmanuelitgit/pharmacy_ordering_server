const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    doctor_id:{
        type:String,
    },
    date:{
        type:String
    },
    time:{
        type:String
    },
    status:{
        type:Boolean
    },
    user:{
        type:String
    },
    doctor_name:{
        type:String
    },
    doctor_role:{
        type:String
    },
    doctor_profile:{
        type:String
    }
}, { timestamps: true })

const Appointment = mongoose.model("Appointment", AppointmentSchema)
module.exports = Appointment;