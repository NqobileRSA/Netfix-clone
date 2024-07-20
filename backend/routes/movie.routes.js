import express from "express";
import {
  getMovieDetails,
  getMovieTrailers,
  getSimilarMovies,
  getTrendingMovie,
  getMoviesByCategory,
} from "../controllers/movies.controllers.js";

const router = express.Router();

router
  .get("/trending", getTrendingMovie)
  .get("/:id/trailers", getMovieTrailers)
  .get("/:id/details", getMovieDetails)
  .get("/:id/similar", getSimilarMovies)
  .get("/:category", getMoviesByCategory);

export default router;
