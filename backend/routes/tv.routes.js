import express from "express";
import {
  getTrendingTv,
  getTvTrailers,
  getTvDetails,
  getSimilarTv,
  getTvByCategory,
} from "../controllers/tv.controllers.js";

const router = express.Router();

router
  .get("/trending", getTrendingTv)
  .get("/:id/trailers", getTvTrailers)
  .get("/:id/details", getTvDetails)
  .get("/:id/similar", getSimilarTv)
  .get("/:category", getTvByCategory);

export default router;
