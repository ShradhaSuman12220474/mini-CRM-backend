import express from 'express'
import { audiencePreviewController } from '../../controllers/audiencePreviewController.js';
import { isAuthenticated } from '../../middlewares/auth.js';
const router = express.Router();


router.get('/preview', isAuthenticated, audiencePreviewController);

export default router;