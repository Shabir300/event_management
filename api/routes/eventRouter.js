import express from 'express';
import { addEvent, getEventSearch } from '../controllers/event.js';
const router = express.Router();

router.post('/event', addEvent);
router.get('/get-event-search', getEventSearch);

export default router;