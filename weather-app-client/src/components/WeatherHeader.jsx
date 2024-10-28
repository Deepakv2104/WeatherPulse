import React, { useEffect, useState } from 'react';
import { MapPin, RefreshCw } from 'lucide-react';
import { debounce } from 'lodash';

const WeatherHeader = ({ city, handleCityChange, setLoading }) => {
  const [inputValue, setInputValue] = useState(city);

  // Apply debouncing to the handleCityChange function
  const debouncedCityChange = debounce((value) => {
    handleCityChange(value);
  }, 500); // 500ms debounce

  // Update input value and trigger debounced function
  useEffect(() => {
    debouncedCityChange(inputValue);
    return () => {
      debouncedCityChange.cancel(); // Cleanup to prevent memory leaks
    };
  }, [inputValue, debouncedCityChange]);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Weather Analytics Dashboard</h1>
        <p className="text-gray-500">Comprehensive weather monitoring and analysis</p>
      </div>
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative flex-1 md:flex-none">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} // Set input value, debounced effect will handle the rest
            className="w-full md:w-auto pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Enter city"
          />
        </div>
        <button
          onClick={() => setLoading(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>
    </div>
  );
};

export default WeatherHeader;
