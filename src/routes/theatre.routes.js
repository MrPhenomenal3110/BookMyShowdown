import express from 'express';

const router = express.Router();

import { addTheatre, deleteTheatre, getAllTheatres, getAllTheatresByOwner, updateTheatre } from '../controllers/theatre.controleer.js';

router.post('/add-theatre',  addTheatre);

router.get('/get-all-theatres', getAllTheatres);

router.post('/get-all-theatres-by-owner', getAllTheatresByOwner);

router.put('/update-theatre', updateTheatre);

router.put('/delete-theatre', deleteTheatre);

export default router;