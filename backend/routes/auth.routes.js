import express from "express";
import { signin, signout, signup } from "../controllers/auth.controllers.js";

const router = express.Router();

router
  .post("/signup", signup)
  .post("/signin", signin)
  .post("/signout", signout);

export default router;
