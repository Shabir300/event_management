import express from 'express';
import { getUser, editUser, changeEmail, changePassword } from '../controllers/user.js';

const router = express.Router();

router.get('/get-user', getUser);
router.put('/edit-user', editUser);
router.put('/change-email', changeEmail)
router.put('/change-password', changePassword)


export default router;