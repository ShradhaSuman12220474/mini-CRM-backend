import express from 'express'
import userRouter from './user.js';
import uploadRouter from './upload.js';
import audienceRouter from './audience.js';
import compaignRouter from './compaign.js';
import segmentRouter from './segment.js';
import deliveryReciptRouter from './deliveryRecipt.js';

const router = express.Router();

router.use('/user', userRouter)
router.use('/uploads',uploadRouter);
router.use('/audience',audienceRouter);
router.use('/compaign', compaignRouter);
router.use('/segment', segmentRouter);
router.use('/deliveryReceipt', deliveryReciptRouter);




export default router;
