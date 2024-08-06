import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import protectRoute from './middleware/protectRoute.middleware.js';
import authRoutes from './routes/auth.routes.js';
import movieRoutes from './routes/movie.routes.js';
import tvRoutes from './routes/tv.routes.js';
import searchRoute from './routes/search.routes.js';

import { ENV_VARS } from './config/config_env.js';
import { connectDB } from './config/db.js';

// Add these lines to create __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = ENV_VARS.PORT;

// middleware
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/movie', protectRoute, movieRoutes);
app.use('/api/v1/tv', protectRoute, tvRoutes);
app.use('/api/v1/search', protectRoute, searchRoute);

// deployment config
if (ENV_VARS.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Listening to port : ${PORT}, running at http://localhost:5000`);
  connectDB();
});
