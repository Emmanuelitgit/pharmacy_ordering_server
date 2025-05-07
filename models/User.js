const mongoose = require("mongoose")

const Schema = mongoose.Schema;

/**
   * @description this model is used to map to the User entities in the database.
   * @date
   */
const UserSchema = new Schema({
    name:{
        type:String,
    },
    email:{
        type:String
    },
    phone:{
        type:Number
    },
    password:{
        type:String
    },
    file:{
        type:String,
        require:false
    }
}, { timestamps: true })

const User = mongoose.model("User", UserSchema)
module.exports = User;