import express from 'express'
import userRouter from './user.js';
import uploadRouter from './upload.js';
import audienceRouter from './audience.js';
import compaignRouter from './compaign.js';
import segmentRouter from './segment.js';
import deliveryReciptRouter from './deliveryRecipt.js';
import dashboardRouter from './dashboard.js';
import orderRouter from './orders.js';
import customerController from './customers.js';
import AImessageRouter from './AIMessage.js';

const router = express.Router();

router.use('/user', userRouter)
router.use('/uploads',uploadRouter);
router.use('/audience',audienceRouter);
router.use('/compaign', compaignRouter);
router.use('/segment', segmentRouter);
router.use('/deliveryReceipt', deliveryReciptRouter);
router.use('/orders',orderRouter);
router.use('/customers',customerController);
router.use('/generateMessage',AImessageRouter);



router.use('/dashboard-summary', dashboardRouter );



export default router;
