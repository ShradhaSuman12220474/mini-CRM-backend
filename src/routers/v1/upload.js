import express from 'express';
import multer from 'multer';
import { uploadCustomers,uploadOrders } from '../../controllers/uploadController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/customers', upload.single('file'), uploadCustomers);
router.post('/orders',upload.single('file'),uploadOrders);

export default router;
