const axios = require('axios');
const weatherRepository = require('../repositories/weatherRepository');
const config = require('../config/config');

// Function to fetch weather data from the external API
const fetchWeatherFromApi = async (city) => {
  try {
    // Construct the URL dynamically
    const url = `${config.WEATHER_API_BASE_URL}?key=${config.WEATHER_API_KEY}&q=${city}&aqi=yes`;

    const response = await axios.get(url);
    const data = response.data;

    return {
      city: data.location.name,
      region: data.location.region,
      country: data.location.country,
      lat: data.location.lat,
      lon: data.location.lon,
      tz_id: data.location.tz_id,
      localtime_epoch: data.location.localtime_epoch,
      localtime: data.location.localtime,

      last_updated_epoch: data.current.last_updated_epoch,
      last_updated: data.current.last_updated,
      temp_c: data.current.temp_c,
      temp_f: data.current.temp_f,
      is_day: data.current.is_day,
      condition_text: data.current.condition.text,
      condition_icon: data.current.condition.icon,

      wind_mph: data.current.wind_mph,
      wind_kph: data.current.wind_kph,
      wind_degree: data.current.wind_degree,
      wind_dir: data.current.wind_dir,
      pressure_mb: data.current.pressure_mb,
      pressure_in: data.current.pressure_in,
      precip_mm: data.current.precip_mm,
      precip_in: data.current.precip_in,

      humidity: data.current.humidity,
      cloud: data.current.cloud,
      feelslike_c: data.current.feelslike_c,
      feelslike_f: data.current.feelslike_f,
      windchill_c: data.current.windchill_c,
      windchill_f: data.current.windchill_f,
      heatindex_c: data.current.heatindex_c,
      heatindex_f: data.current.heatindex_f,
      dewpoint_c: data.current.dewpoint_c,
      dewpoint_f: data.current.dewpoint_f,
      vis_km: data.current.vis_km,
      vis_miles: data.current.vis_miles,
      uv: data.current.uv,

      gust_mph: data.current.gust_mph,
      gust_kph: data.current.gust_kph,

      // Air quality details
      air_quality: {
        co: data.current.air_quality.co,
        no2: data.current.air_quality.no2,
        o3: data.current.air_quality.o3,
        so2: data.current.air_quality.so2,
        pm2_5: data.current.air_quality.pm2_5,
        pm10: data.current.air_quality.pm10,
        us_epa_index: data.current.air_quality['us-epa-index'],
        gb_defra_index: data.current.air_quality['gb-defra-index'],
      }
    };
  } catch (error) {
    throw new Error('Failed to fetch weather data from the API');
  }
};

// Service to save weather data
const saveWeatherData = async (city) => {
  const weatherData = await fetchWeatherFromApi(city);
  await weatherRepository.saveWeatherData(weatherData);
  return weatherData;
};

module.exports = {
  saveWeatherData,
  fetchWeatherFromApi, // Export if you need to fetch without saving
};
