import express from 'express';

const router = express.Router();

import { addShow, deleteShow, getAllShowsByTheatre, getAllTheatresByMovie, updateShow, getShowById } from '../controllers/show.controller.js';

router.post('/add-show',  addShow);

router.post('/delete-show', deleteShow)

router.post('/get-all-shows-by-theatre', getAllShowsByTheatre);

router.post("/get-all-theatres-by-movie", getAllTheatresByMovie);

router.post('/get-show-by-id', getShowById);

router.put("/update-show", updateShow)

export default router;
