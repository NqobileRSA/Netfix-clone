import express from 'express';
import {
  signup,
  login,
  logout,
  authCheck,
} from '../controllers/auth.controllers.js';
import protectRoute from '../middleware/protectRoute.middleware.js';

const router = express.Router();

router
  .post('/signup', signup)
  .post('/login', login)
  .post('/logout', logout)
  .post('/authCheck', protectRoute, authCheck);

export default router;
