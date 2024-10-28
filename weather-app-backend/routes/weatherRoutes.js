const express = require('express');
const weatherController = require('../controllers/weatherController');
const router = express.Router();

router.get('/current/:city', weatherController.getCurrentWeather);
router.get('/history/:city', weatherController.getWeatherHistory);

module.exports = router;
