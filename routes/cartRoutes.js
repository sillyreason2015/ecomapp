import router from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'




import {addCart,viewCart,updateCart,deleteItem, deleteCart} from '../controllers/cartApi/cartBarrel.js'

const cartRouter = router()

cartRouter
.post('/add/:id/', authMiddleware,addCart)
.get('/view', authMiddleware,viewCart)
.put('/update/:Pid', authMiddleware,updateCart)
.delete('/delete/:id', authMiddleware,deleteItem)
.delete('/delete/', authMiddleware, deleteCart)

export default cartRouter