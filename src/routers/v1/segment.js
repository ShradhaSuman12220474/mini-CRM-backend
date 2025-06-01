import express from 'express';
import { createSegmentController, getAllSegmentController } from '../../controllers/segmentController.js';

const router = express.Router();

router.get('/',getAllSegmentController);
router.post('/',createSegmentController);

export default router;