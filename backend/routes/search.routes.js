import express from 'express';
import {
  deleteSearchItem,
  searchMovie,
  searchPerson,
  searchTv,
} from '../controllers/search.controllers.js';
import { getSearchHistory } from '../controllers/search.controllers.js';
const router = express.Router();

router
  .get('/person/:query', searchPerson)
  .get('/movie/:query', searchMovie)
  .get('/tv/:query', searchTv)
  .get('/history', getSearchHistory)
  .delete('/history/:id', deleteSearchItem);

export default router;
