import router  from 'express'
  

import {loginUser} from '../controllers/authApi/authBarrel.js'
import {logoutUser} from '../controllers/authApi/authBarrel.js'


const authRouter = router()

authRouter
.post('/user/login', loginUser)
.post('user/logout', logoutUser)




export default authRouter;