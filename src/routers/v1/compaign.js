import express from 'express';
import { createCompaignController,getAllCompaignController } from '../../controllers/compaignController.js';

const router = express.Router();

router.post('/', createCompaignController);
router.get('/getCompaigns',getAllCompaignController);


export default router;
