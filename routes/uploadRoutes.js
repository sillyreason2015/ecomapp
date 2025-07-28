import router from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import upload from '../middlewares/fileuploadmiddleware.js';
import {readFile, deleteFile, uploadFile, updateFile} from '../controllers/uploadApi/uploadBarrel.js'

const uploadRouter = router();

uploadRouter
  .get('/view', authMiddleware, readFile)
  .post('/upload', authMiddleware,upload.single('profilePic'),uploadFile)
  .put('/edit/:id', authMiddleware, updateFile)  
  .delete('/delete/:id', authMiddleware, deleteFile);

export default uploadRouter;
