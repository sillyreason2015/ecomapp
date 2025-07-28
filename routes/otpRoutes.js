import router  from 'express'
  

import {verifyOTP, resendOTP} from '../controllers/otpApi/otpBarrel.js'



const otpRouter = router()

otpRouter
.post('/verify', verifyOTP)
.post('/resend', resendOTP)



export default otpRouter;