import User from "../../Schema/userSchema.js"
import { sendMail } from "../../utils/sendMail.js"
import crypto from 'crypto'
import bcryptjs from 'bcryptjs'


export const resetPassword = async (req, res) => {
    const {token, newPassword} = req.body

    try{
        const user = await User.findOne({passwordResetToken: token, passwordResetExpires: {$gt: Date.now()}})
        if (!user){
            return res.status(400).json({message: "Password Reset token is Invalid/ Expired"})
        }
        user.password = bcryptjs.hashSync(newPassword, 10)
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined
        await user.save()
        return res.status(200).json({messsage: "Password Reset Successfully! Please Proceed to login"})
    }catch(error){
        return res.status(500).json({message: error.message})
    }
}