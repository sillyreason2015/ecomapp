import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const genToken = (userId)=>{
    return jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1h"})
}

export default genToken