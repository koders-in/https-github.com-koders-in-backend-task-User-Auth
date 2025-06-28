const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;


  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization token missing' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; 
    next(); 
  } catch (error) {
    // Handle expired token
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired. Please log in again.' });
    }

    // Handle invalid token
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token. Authentication failed.' });
    }

    // Generic error fallback
    return res.status(401).json({ error: 'Unauthorized access' });
  }
};
