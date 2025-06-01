import express from 'express';
import { createSegmentController, getAllSegmentController } from '../../controllers/segmentController.js';
import { isAuthenticated } from '../../middlewares/auth.js';

const router = express.Router();

router.get('/',isAuthenticated, getAllSegmentController);
router.post('/',isAuthenticated, createSegmentController);

export default router;