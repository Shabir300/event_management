import express from 'express';
import { addEvent, getEvent, getEventSearch, getInterestedEventsObjs } from '../controllers/event.js';
const router = express.Router();

router.post('/event', addEvent);
router.get('/get-event-search', getEventSearch);
router.get('/event/:id', getEvent);
router.get('/interested-events-objs', getInterestedEventsObjs);

export default router;