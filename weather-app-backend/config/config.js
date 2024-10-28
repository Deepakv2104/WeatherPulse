require('dotenv').config(); // Load .env variables

const config = {
  MONGODB_URI: process.env.MONGO_URI,
  WEATHER_API_KEY: process.env.WEATHER_API_KEY,
  WEATHER_API_BASE_URL: process.env.WEATHER_API_BASE_URL,
  PORT: process.env.PORT || 3000,
};

module.exports = config;
