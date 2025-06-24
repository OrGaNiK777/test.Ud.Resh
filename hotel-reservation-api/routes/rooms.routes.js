import { Router } from 'express';
const router = Router();
import {getAvailableRooms, getAllRooms} from '../controllers/rooms.controller.js';

router.get('/', getAllRooms);
router.get('/available', getAvailableRooms);

export default router;
