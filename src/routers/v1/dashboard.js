import express from 'express';
import { isAuthenticated } from '../../middlewares/auth.js';
import { dashboardController } from '../../controllers/dashboardController.js';

const router = express.Router();

router.get('/',isAuthenticated, dashboardController);

export default router;