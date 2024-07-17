import express from 'express';

const router = new express.Router();


import { webhook, bookShow, getAllBookings, makePayment } from '../controllers/booking.controller.js';
import { auth } from '../middlewares/auth.middleware.js'

router.post('/webhook', express.raw({ type: 'application/json' }), webhook);
router.post("/make-payment", makePayment);
router.post("/book-show", bookShow);
router.get("/get-all-bookings", auth, getAllBookings);

export default router