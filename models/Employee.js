const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Employee schema
const employeeSchema = new Schema({
    name: {
        type: String,
        required: true 
    },
    age: {
        type: Number,
        min: 18,
        max: 100
    },
    GPA: {
        type: Number,
        min: 0,
        max: 4.0
    }
}, { timestamps: true });

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
