import express from 'express'
import userRouter from './user.js';
import uploadRouter from './upload.js';
const router = express.Router();

router.use('/user', userRouter)
router.use('/uploads',uploadRouter);

export default router;
