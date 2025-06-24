import { Router } from 'express';
const router = Router();

import { bookRoom, cancelBooking, getAllBookings } from '../controllers/bookings.controller.js';

router.post('/postbrok', bookRoom);
router.get('/getall', getAllBookings);
router.delete('/:bookingId', cancelBooking);

export default router;
