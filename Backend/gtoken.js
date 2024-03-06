const jwt = require('jsonwebtoken');

// Your secret key for signing the JWT
const secretKey = 'your_secret_key';

// Function to generate a JWT
const generateToken = (username, userId) => {
  // JWT payload with user information
  const payload = {
    username: username,
    userId: userId,
  };

  // Options for token generation (e.g., expiration time)
  const options = {
    expiresIn: '24h', // Token expires in 24 hours
  };

  // Generate the JWT
  const token = jwt.sign(payload, secretKey, options);

  return token;
};

// Example usage
const random = 'exampleUser289798378923hjhkj';

const generatedToken = generateToken(random);

console.log('Generated Token:', generatedToken);
