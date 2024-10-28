const CurrentConditions = ({ weatherData, getWeatherImage }) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">Current Conditions</h2>
        <div className="flex flex-col items-center justify-center">
          <div className="flex justify-between w-full mb-4">
            <div>
              <p className="text-5xl font-bold text-gray-900">{weatherData?.temp_c}°C</p>
              <p className="text-sm text-gray-500">Feels like {weatherData?.feelslike_c}°C</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-medium">{weatherData?.condition_text}</p>
              <p className="text-sm text-gray-500">{weatherData?.city}, {weatherData?.country}</p>
              <p className="text-sm text-gray-500">Local Time: {weatherData?.localtime}</p>
            </div>
          </div>
          <div className="mt-4">
            <img
              src={getWeatherImage(weatherData?.temp_c)}
              alt="Weather condition"
              className="w-40 h-40 rounded-full border border-gray-300"
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default CurrentConditions;
  