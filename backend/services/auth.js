const JWT = require('jsonwebtoken');
require('dotenv').config();

// Get secret key from environment variables
const jwtSecret = process.env.JWT_secret_key;

if (!jwtSecret) {
  console.error('JWT Secret Key is missing from environment variables!');
  process.exit(1); // Exit if the secret key is not found
}

// Create a token for the user
function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
  };

  const token = JWT.sign(payload, jwtSecret, { expiresIn: '1h' });
  return token;
}

// Validate the token and extract the payload
function validateToken(token) {
  try {
    // Verify the token using the secret key
    const payload = JWT.verify(token, jwtSecret);
    return payload; // Return decoded payload if valid
  } catch (error) {
    // Handle specific errors
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token has expired');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Invalid token');
    } else {
      throw new Error('Error validating token');
    }
  }
}

module.exports = {
  createTokenForUser,
  validateToken,
};
