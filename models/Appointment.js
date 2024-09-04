const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor', 
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    user: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Appointment = mongoose.model("Appointment", AppointmentSchema);
module.exports = Appointment;