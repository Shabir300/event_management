import express from 'express';
import { getUser } from '../controllers/user.js';

const router = express.Router();

router.get('/get-user', getUser)

export default router;