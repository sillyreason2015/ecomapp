import User from '../../Schema/userSchema.js'
import bcryptjs from 'bcryptjs'
import {sendMail} from '../../utils/sendMail.js'
import dotenv from 'dotenv'

dotenv.config()


export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are mandatory' });
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    const otpExpires = new Date(Date.now() + 1000 * 60 * 5).toISOString(); // 5 minutes from now

    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    const newUser = new User({
      ...req.body,
      password: hashedPassword,
      otp,
      otpExpires,
    });

    await newUser.save();
    // Send email AFTER otp and otpExpires are defined
    const mail = {
      mailFrom: process.env.EMAIL_USER,
      mailTo: email,
      subject: 'New User Registration Successful',
      body: `Hi ${username}. Thank you for signing up. Your verification code is ${otp}, and it expires in 5 Minutes.`,
    };

    await sendMail(mail);
    return res.status(201).json({ message: 'New user created successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
