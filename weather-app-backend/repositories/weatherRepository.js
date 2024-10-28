const Weather = require('../models/weatherModel');

const saveWeatherData = async (weatherData) => {
  const weather = new Weather(weatherData);
  return await weather.save();
};

const getLatestWeather = async (city) => {
  return await Weather.findOne({ city }).sort({ createdAt: -1 });
};

const getWeatherHistory = async (city, daysAgo) => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - daysAgo);

  return await Weather.find({
    city,
    createdAt: { $gte: startDate },
  }).sort({ createdAt: 1 });
};

module.exports = {
  saveWeatherData,
  getLatestWeather,
  getWeatherHistory,
};
