import express from "express";
import { signin, signout, signup } from "../controllers/auth.controllers.js";

const router = express.Router();

router.get("/signup", signup).post("/signin", signin).post("/signout", signout);

export default router;
