import User from '../../Schema/userSchema.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { sendMail } from '../../utils/sendMail.js'


export const loginUser = async (req, res) => {
    const {email, password} = req.body
    
    const mail = {
    mailFrom: process.env.EMAIL_USER,
    mailTo: email,
    subject: 'Login Sucessful',
    body: `Hi. You just logged into your account. If this wasn't you, please reply to this email.`
   }

    
    if(!email || !password){
       return  res.status(400).json({message: "Please provide all fields"})   
    }
    try{
        const user = await User.findOne({email})
        if(!user){
          return res.status(400).json({message: "User not found! please register to continue"})
        }
        if(!user.isVerified){
          return res.status(400).json({message: "Please Verify OTP before login"})
        }
       const comparePassword = await bcryptjs.compare(password, user.password)
       if(!comparePassword){
       return res.status(401).json({message: "Invalid Login Credentials"})
       }

       const getToken = (userId) => { 
            return jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "5h"})
        }
        //send email
         await sendMail(mail)
        
       const token = getToken(user._id)
       return res
       .cookie('token', token, {httpOnly: true, sameSite: 'strict', secure: false, path: '/'})
       .status(200).json({message: "Login Successful"})

    }catch(error){
        res.status(500).json({message: error.message})
    }
}

