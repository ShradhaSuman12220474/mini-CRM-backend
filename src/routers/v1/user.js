import express from 'express';
import { googleLogin } from '../../controllers/authController.js';


const router = express.Router();

router.get('/oauth',googleLogin);


export default router;

