const User = require("../models/User");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


const Register = async(req, res, next)=>{
  try {
    const {name, email, phone, password} = req.body;

    const salt = 10
    const hashedPassword = bcrypt.hashSync(password, salt)

    const newUser = new User({
        name,
        email,
        phone,
        password:hashedPassword
    });
    
    if(!newUser){
        return res.status(400).json({message:'Empty fields not allowed!'})
    }
    if(newUser){
        await newUser.save()
        return res.status(201).json({message:'Inserted successfully'})
    }
  } catch (error) {
    console.log(error)
  }
    
}

const Login = async(req, res)=>{
try {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(!user){
        return res.status(404).json({message:'User not found!'})
    }

    const isPasswordMatch = bcrypt.compareSync(password, user.password)

    if(!isPasswordMatch){
        return res.status(401).json({message:"Invalid password"})
    }

    const token = jwt.sign({id:user._id, email:user.email}, "jwt_key", {expiresIn:'10s'});
    const refreshToken = jwt.sign({id:user._id, email:user.email}, "refresh_key", {expiresIn:'1h'});
    res.cookie("token", token, {maxAge:30000});
    res.cookie("refreshToken", refreshToken, {maxAge:600000})
    return res.status(200).json({message:'User validated successfully', refreshToken:refreshToken, token:token})

} catch (error) {
    console.log(error)
}
}

module.exports = {Register, Login};