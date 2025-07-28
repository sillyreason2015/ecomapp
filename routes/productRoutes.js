import router from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';

import {createProduct,getProduct,getAllProducts,getByQueryParams,updateProduct,deleteProduct} from '../controllers/productApi/productBarrel.js'

const Router = router();

Router
  .get('/product/:id', authMiddleware, getProduct)
  .get('/products/', getAllProducts)
  .get('/product', getByQueryParams)
  .post('/product/create', authMiddleware, createProduct)
  .put('/edit/:id', authMiddleware, updateProduct)  // fixed route path
  .delete('/product/delete/:id', authMiddleware, deleteProduct);

export default Router;
