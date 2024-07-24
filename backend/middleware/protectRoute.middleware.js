import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { ENV_VARS } from '../config/config_env.js';

const protectRoute = async (req, res, next) => {
  const token = req.cookies['jwt-netflix'];
  try {
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'Unauthorized - No Token Provided' });
    }

    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized - Token Verification Failed',
      });
    }

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User Not Found' });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error('Error in protectRoute middleware : ', error.message);
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error' });
  }
};

export default protectRoute;
