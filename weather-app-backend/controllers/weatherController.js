const weatherService = require('../services/weatherService');

// Controller to get current weather
const getCurrentWeather = async (req, res) => {
  const { city } = req.params;
  try {
    const weather = await weatherService.getCurrentWeather(city);
    if (weather) {
      res.json(weather);
    } else {
      res.status(404).json({ error: 'Weather data not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get weather history (last 3 days)
const getWeatherHistory = async (req, res) => {
  const { city } = req.params;
  try {
    const history = await weatherService.getWeatherHistory(city, 3);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCurrentWeather,
  getWeatherHistory,
};
