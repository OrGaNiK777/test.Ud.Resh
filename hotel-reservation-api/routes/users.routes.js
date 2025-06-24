import { Router } from 'express';
const router = Router();
import { registerUser, getUserById, registerUserVip } from '../controllers/users.controller.js';

// router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/:userId', getUserById);
router.patch('/patchvip', registerUserVip)

export default router;