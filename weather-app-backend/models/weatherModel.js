const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  city: String,
  region: String,
  country: String,
  lat: Number,
  lon: Number,
  localtime: String,
  
  last_updated: String,
  temp_c: Number,
  temp_f: Number,
  is_day: Number,
  condition_text: String,
  condition_icon: String,
  
  wind_mph: Number,
  wind_kph: Number,
  wind_degree: Number,
  wind_dir: String,
  pressure_mb: Number,
  pressure_in: Number,
  precip_mm: Number,
  precip_in: Number,
  
  humidity: Number,
  cloud: Number,
  feelslike_c: Number,
  feelslike_f: Number,
  windchill_c: Number,
  windchill_f: Number,
  heatindex_c: Number,
  heatindex_f: Number,
  dewpoint_c: Number,
  dewpoint_f: Number,
  vis_km: Number,
  vis_miles: Number,
  uv: Number,
  
  gust_mph: Number,
  gust_kph: Number,
}, { timestamps: true });

module.exports = mongoose.model('Weather', weatherSchema);
