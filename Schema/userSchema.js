import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false, 
  },
  otp: String,
  otpExpires: Date,
  isVerified: {type: Boolean, default: false},
  lastOtpSentAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  // profile: {
  //   country: {
  //     type: String,
  //     required: true,
  //   },
  //   Number: {
  //     type: Number,
  //     required: true,
  //   },
  //   Street: {
  //     type: String,
  //     required: true,
  //   },
  //   Bio: {
  //     type: String,
  //     required: true,
  //   },
  // },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
