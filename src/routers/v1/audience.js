import express from 'express'
import { audiencePreviewController } from '../../controllers/audiencePreviewController.js';
const router = express.Router();


router.get('/preview', audiencePreviewController);

export default router;