import express from 'express';

const router = express.Router();

import { addMovie, deleteMovie, getAllMovies, getMovieById, updateMovie } from '../controllers/movie.controller.js'; 

router.post('/add-movie' , addMovie);

router.get('/get-all-movies' , getAllMovies);

router.put('/update-movie', updateMovie);

router.put('/delete-movie', deleteMovie)

router.get('/movie/:id', getMovieById);

export default router