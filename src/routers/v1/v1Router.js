import express from 'express'
import userRouter from './user.js';
import uploadRouter from './upload.js';
import audienceRouter from './audience.js';
import compaignRouter from './compaign.js';

const router = express.Router();

router.use('/user', userRouter)
router.use('/uploads',uploadRouter);
router.use('/audience',audienceRouter);
router.use('/compaign', compaignRouter);



export default router;
