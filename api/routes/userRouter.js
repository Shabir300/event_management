import express from 'express';
import { getUser, editUser, changeEmail, changePassword, getOrganizer } from '../controllers/user.js';

const router = express.Router();

router.get('/get-user', getUser);
router.put('/edit-user', editUser);
router.put('/change-email', changeEmail);
router.put('/change-password', changePassword);
router.get('/get-organizer', getOrganizer)


export default router;