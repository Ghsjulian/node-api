const dotenv = require('dotenv');

dotenv.config({ path: '../.env' }); // Load environment variables from the root directory

module.exports = {
  secretKey: process.env.SECRET_KEY,
  expiresIn: process.env.EXPIRES_IN,
};
