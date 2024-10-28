import { Wind } from 'lucide-react';
import Lottie from 'react-lottie';

const WindConditions = ({ weatherData, windOptions }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Wind Conditions</h2>
      <div className="flex items-center justify-between">
        <div>
          <Wind className="h-8 w-8 text-blue-500" />
          <p className="text-gray-500">Wind Chill: {weatherData.windchill_c}°C</p>
          <p className="text-gray-500">Dew Point: {weatherData.dewpoint_c}°C</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">{weatherData.wind_kph} km/h</p>
          <p className="text-gray-500">Direction: {weatherData.wind_dir}</p>
          <p className="text-gray-500">Gusts: {weatherData.gust_kph} km/h</p>
        </div>
      </div>
      <Lottie options={windOptions} height={230} width={230} />
    </div>
  );
};

export default WindConditions;
