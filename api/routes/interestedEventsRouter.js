import express from 'express';
import { addInterestedEvent, getInterestedEvents, getInterestedUsers, removeInterestedEvent } from '../controllers/interestedEvents.js';

const router = express.Router();

router.post('/interested-event', addInterestedEvent);
router.delete('/interested-event', removeInterestedEvent);
router.get('/interested-events', getInterestedEvents);
router.get('/interested-users', getInterestedUsers);

export default router;