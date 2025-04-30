// middleware/authMiddleware.js
const { validateToken } = require('../services/auth'); // adjust path if needed

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const user = validateToken(token);  // using your function
    req.user = user;                    // attach to req for later use
    next();                             // continue
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
