import express from 'express';
import { addInterestedEvent, getInterestedEvents, getInterestedUsers } from '../controllers/interestedEvents.js';

const router = express.Router();

router.post('/interested-event', addInterestedEvent);
router.get('/interested-events', getInterestedEvents);
router.get('/interested-users', getInterestedUsers);

export default router;