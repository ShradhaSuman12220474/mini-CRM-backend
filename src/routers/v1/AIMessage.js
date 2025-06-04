import express from 'express';
import AImessageGeneratorController from '../../controllers/AImessageGeneratorController.js'
import { isAuthenticated } from '../../middlewares/auth.js';
const router = express.Router();

router.get('/',isAuthenticated, AImessageGeneratorController);


export default router;