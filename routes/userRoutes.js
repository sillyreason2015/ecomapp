import router from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';

import {registerUser,getUser,getAllUsers,getByQueryParams,updateUser,editProfile,deleteUser,} from '../controllers/userApi/barrel.js'

const Router =router()

Router
  .get('/user/:id', authMiddleware, getUser)
  .get('/users/', authMiddleware, getAllUsers)
  .get('/user', getByQueryParams)
  .post('/user/create', registerUser)
  .put('/edit/:id', authMiddleware, updateUser)
  .put('/editProfile', authMiddleware, editProfile)
  .delete('/user/delete/:id', authMiddleware, deleteUser);

export default Router;
