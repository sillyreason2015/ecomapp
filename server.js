import express from 'express'
import connectDb from './database/db.js'
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import productRouter from './routes/productRoutes.js'
import uploadRouter from './routes/uploadRoutes.js'
import otpRouter from './routes/otpRoutes.js'
import passwordRouter from './routes/passwordRoutes.js'
import allApis from './routes/allApis.js'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';


const app = express()

dotenv.config();
process.env.PORT


connectDb()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())


app.use('/api', userRouter)
app.use('/api', authRouter)
app.use('/api', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/file', uploadRouter)
app.use('/api/otp', otpRouter)
app.use('/api', passwordRouter)
app.use('/api', allApis)

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server has started on ${process.env.PORT}`)
})