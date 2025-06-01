import express from 'express';
import multer from 'multer';
import { uploadCustomers,uploadOrders } from '../../controllers/uploadController.js';
import { isAuthenticated } from '../../middlewares/auth.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/customers',isAuthenticated, upload.single('file'), uploadCustomers);
router.post('/orders',isAuthenticated, upload.single('file'),uploadOrders);

export default router;
