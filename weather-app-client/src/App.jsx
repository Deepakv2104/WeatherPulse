import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import wind from './assets/wind.json';
import loader from './assets/loader.json'
import hot from './assets/hot.png';
import cold from './assets/cold.png';
import cool from './assets/cool.png';
import warm from './assets/warm.png';
import WeatherHeader from './components/WeatherHeader';
import CurrentConditions from './components/CurrentConditions';
import WindConditions from './components/WindConditions';
import AirQuality from './components/AirQuality';
import TabsComponent from './components/TabsComponent';
import Lottie from 'react-lottie';
const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('London');
  const [activeTab, setActiveTab] = useState('conditions');
  const temperatureHistory = [
    { time: '00:00', temp: 15 },
    { time: '01:00', temp: 14 },
    { time: '02:00', temp: 13 },
    { time: '03:00', temp: 13 },
    { time: '04:00', temp: 12 },
    { time: '05:00', temp: 11 },
    { time: '06:00', temp: 12 },
    { time: '07:00', temp: 14 },
    { time: '08:00', temp: 16 },
    { time: '09:00', temp: 18 },
    { time: '10:00', temp: 20 },
    { time: '11:00', temp: 22 },
    { time: '12:00', temp: 24 },
    { time: '13:00', temp: 25 },
    { time: '14:00', temp: 26 },
    { time: '15:00', temp: 27 },
    { time: '16:00', temp: 28 },
    { time: '17:00', temp: 27 },
    { time: '18:00', temp: 26 },
    { time: '19:00', temp: 24 },
    { time: '20:00', temp: 22 },
    { time: '21:00', temp: 20 },
    { time: '22:00', temp: 18 },
    { time: '23:00', temp: 16 }
  ];

  const windOptions = {
    loop: true,
    autoplay: true,
    animationData: wind,
    rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
  };
  const loaderOptons = {
    loop: true,
    autoplay: true,
    animationData: loader,
    rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
  };
  const getWeatherImage = (temp) => {
    if (temp > 30) return hot;
    else if (temp > 20) return warm;
    else if (temp > 10) return cool;
    else return cold;
  };

  useEffect(() => {
    console.log('WebSocket URI:', process.env.REACT_APP_SERVER_URI);  // Debug log
    const ws = new WebSocket(process.env.REACT_APP_SERVER_URI);
    ws.onopen = () => ws.send(JSON.stringify({ city }));
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setWeatherData(data);
      setLoading(false);
    };
    return () => ws.close();
  }, [city]);
  
  

  const handleCityChange = debounce((newCity) => {
    setCity(newCity);
    setLoading(true);
  }, 500);

  if (!weatherData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Lottie options={loaderOptons} height={100} width={100} />
      </div>
    );
  }
  

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <WeatherHeader city={city} handleCityChange={handleCityChange} setLoading={setLoading} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CurrentConditions weatherData={weatherData} getWeatherImage={getWeatherImage} />
          <WindConditions weatherData={weatherData} windOptions={windOptions} />
          <AirQuality airQuality={weatherData.air_quality} />
        </div>
        <TabsComponent activeTab={activeTab} setActiveTab={setActiveTab} temperatureHistory={temperatureHistory} weatherData={weatherData} />
      </div>
    </div>
  );
};

export default App;
