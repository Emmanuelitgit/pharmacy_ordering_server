const mongoose = require("mongoose")

const Schema = mongoose.Schema;

/**
   * @description this model is used to map to the Otp entities in the database.
   * @date
   */
const OtpSchema = new Schema({
    otp:{
        type:String
    },
    user_id:{
        type:String
    },
    expiresAt:{
        type:Number
    },
    verify:{
        type:Boolean
    }
}, { timestamps: true })

const Otp = mongoose.model("Otp", OtpSchema)
module.exports = Otp;