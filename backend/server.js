import express from "express";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use("/api/v1/auth", authRoutes);

const port = 5000;
app.listen(port, console.log(`Listening to port : ${port}`));
