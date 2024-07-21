import express from 'express';
import {
  searchMovie,
  searchPerson,
  searchTv,
} from '../controllers/search.controllers.js';
const router = express.Router();

router
  .get('/person/:query', searchPerson)
  .get('/movie/:query', searchMovie)
  .get('/tv/:query', searchTv);

export default router;
