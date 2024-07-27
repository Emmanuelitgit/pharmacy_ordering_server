const User = require("../models/User");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const Otp = require("../models/Otp")


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: "eyidana001@gmail.com",
      pass: "rukq qdrd enur cfrk",
    },
  });
  
  transporter.verify(function (error, success) {
    if (error) {
      console.log("Transporter verification error:", error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

const senOtp = async({user_id, email, name}) =>{
    try {
        const otp = `${Math.floor(100000 + Math.random() * 900000)}`;

        const mailOptions = {
            from:"eyidana001@gmail.com",
            to:email,
            subject:"OTP Verification Code",
            html:`<p>Hey ${name}, Enter ${otp} in the app to verify your email. Thank you for signing up into our app</p>`
        }
    
        const expiresAt = Date.now() + 3600000; // 1 hour from now
        const salt = 10;
        const hashedOtp = bcrypt.hashSync(otp, salt)
        const newOtp =  new Otp({
            user_id,
            otp:hashedOtp,
            expiresAt,
            verify:false
        });
    
        if(!newOtp){
            console.log("an error occurs in inserting otp")
        }
        if(newOtp){
            await newOtp.save()
            transporter.sendMail(mailOptions)
        }
    } catch (error) {
        console.log(error)
    }
}


const verifyOtp = async (req, res) => {
    try {
        const { otp } = req.body;
        const user_id = req.params.id;

        if (typeof otp !== 'string') {
            return res.status(400).json({ message: 'OTP must be a string' });
        }

        const userExist = await Otp.findOne({ user_id }); 

        if (!userExist) {
            return res.status(404).json({ message: 'User OTP not found' });
        }

        const expiresAt = userExist.expiresAt;
        if (expiresAt < Date.now()) {
            const deleteUser = await Otp.findOneAndDelete({ user_id });
            if (!deleteUser) {
                return res.status(400).json({ message: 'Error deleting user OTP' });
            }
            return res.status(400).json({ message: 'OTP expired' });
        }

        const hashedOtp = userExist.otp;

        const isHashedOtpMatch = bcrypt.compareSync(otp, hashedOtp); 
        if (!isHashedOtpMatch) {
            return res.status(400).json({ message: 'OTP not matched or invalid' });
        } else {
            const updateOtp = await Otp.findOneAndUpdate(
                { user_id },
                { $set: { verify: true } },
                { new: true } 
            );
            if (!updateOtp) {
                return res.status(400).json({ message: 'Error updating user OTP' });
            }
        }

        const deleteOtp = await Otp.findOneAndDelete({ user_id });
        if (!deleteOtp) {
            return res.status(400).json({
                message: 'Error verifying OTP',
                status: 'Unverified'
            });
        }

        return res.status(200).json({
            message: 'OTP verified successfully',
            status: 'Verified'
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


const Register = async (req, res, next) => {
    try {
      console.log("Request Body:", req.body); 
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
      const otpResponse = senOtp({user_id:newUser?._id, email:newUser.email, name:newUser?.name})
      if(otpResponse){
        return res.status(201).json({ message: 'Otp sent successfully', user:newUser });
      }
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
    return res.status(200).json({message:'User validated successfully', refreshToken:refreshToken, token:token, user:user})

} catch (error) {
    console.log(error)
}
}

module.exports = {Register, Login, verifyOtp};