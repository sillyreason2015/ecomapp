
import router  from 'express'
  

import {resetPassword} from '../controllers/passwordApi/passwordBarrel.js'
import {requestPassword} from '../controllers/passwordApi/passwordBarrel.js'


const passwordRouter = router()

passwordRouter
.post('/password/reset', resetPassword)
.post('/password/reqreset', requestPassword)




export default passwordRouter;