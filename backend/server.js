import express from "express";
import authRoutes from "./routes/auth.routes.js";
import { ENV_VARS } from "./config/config_env.js";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = ENV_VARS.PORT;

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Listening to port : ${PORT}, running at http://localhost:5000`);
  connectDB();
});
