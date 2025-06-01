import express from 'express';
import { createCompaignController,getAllCompaignController } from '../../controllers/compaignController.js';
import { isAuthenticated } from '../../middlewares/auth.js';

const router = express.Router();

router.post('/', isAuthenticated, createCompaignController);
router.get('/getCompaigns',isAuthenticated, getAllCompaignController);


export default router;
