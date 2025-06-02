import express from 'express';
import { getAllOrderController } from '../../controllers/orderController.js';
const router = express.Router();

router.get('/',getAllOrderController);

export default router;