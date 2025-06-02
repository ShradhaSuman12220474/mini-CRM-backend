import express from 'express';
import { getAllCustomersController } from '../../controllers/customerController.js';

const router = express.Router();

router.get('/',getAllCustomersController);

export default router;