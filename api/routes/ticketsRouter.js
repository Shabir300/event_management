import express from 'express';
import { addTickets } from '../controllers/tickets.js';

const router = express.Router();

router.post('/tickets', addTickets)

export default router;