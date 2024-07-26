const User = require("../models/User");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")


// const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false,
//     auth: {
//       user: process.env.OTP_EMAIL,
//       pass: process.env.OTP_PASS,
//     },
//   });
  
//   transporter.verify(function (error, success) {
//     if (error) {
//       console.log("Transporter verification error:", error);
//     } else {
//       console.log("Server is ready to take our messages");
//     }
//   });

const senOtp = (req, res) =>{
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
}

const Register = async (req, res, next) => {
    try {
      console.log("Request Body:", req.body); // Log request body to debug
      const { name, email, phone, password } = req.body;
      const file = req.file;

      if (!name || !email || !phone || !password) {
        return res.status(400).json({ message: 'All fields are required!' });
      }
  
      const salt = 10;
      const hashedPassword = bcrypt.hashSync(password, salt);
  
      const newUser = new User({
        name,
        email,
        phone,
        password: hashedPassword,
        file:file?.filename
      });
  
      await newUser.save();
      return res.status(201).json({ message: 'Inserted successfully' });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };  

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
    res.cookie("refreshToken", refreshToken, {maxAge:6000000})
    return res.status(200).json({message:'User validated successfully', refreshToken:refreshToken, token:token})

} catch (error) {
    console.log(error)
}
}

module.exports = {Register, Login};