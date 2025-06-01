import express from 'express'
import { deliveryReceiptController } from '../../controllers/deliveryReceiptController.js';

const router = express.Router();


router.post('/',deliveryReceiptController);

export default router;