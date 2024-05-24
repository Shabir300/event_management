import express from 'express';
import { addEvent } from '../controllers/event.js';
const router = express.Router();

router.post('/event', addEvent);

export default router;