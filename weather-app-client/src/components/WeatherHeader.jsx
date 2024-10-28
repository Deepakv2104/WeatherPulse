import React, { useState, useEffect } from 'react';
import { MapPin, RefreshCw, Search } from 'lucide-react';
import logo from '../assets/logo.png'
const WeatherHeader = ({ city, handleCityChange, setLoading }) => {
  const [inputValue, setInputValue] = useState(city);
  const [suggestions, setSuggestions] = useState([]); // To store city suggestions

  // Initialize Google Places Autocomplete service
  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.onload = () => {
        console.log('Google Maps API loaded.');
      };
    }
  }, []);

  // Function to fetch suggestions based on user input
  const fetchSuggestions = (input) => {
    if (!input || !window.google) return;

    const autocompleteService = new window.google.maps.places.AutocompleteService();

    autocompleteService.getPlacePredictions(
      { input, types: ['(cities)'] },
      (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setSuggestions(predictions || []);
        }
      }
    );
  };

  // When the search button is clicked, trigger the city change and loading state
  const handleSearchClick = () => {
    handleCityChange(inputValue);  // Send the city name when search is clicked
    setLoading(true);              // Set loading state to true
    setSuggestions([]);            // Clear suggestions on search
  };

  // Handle input change and fetch city suggestions
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    fetchSuggestions(value);
  };

  // Handle selecting a suggestion and trigger search immediately
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion.description);  // Update input value to selected suggestion
    setSuggestions([]);                     // Clear the suggestions after selection
    handleCityChange(suggestion.description); // Trigger the search directly
    setLoading(true);                        // Set loading state to true
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="flex items-center gap-4">
  {/* Logo */}
  <img src="./src/assets/brand.jpeg" alt="WeatherPulse Logo" className="h-12 w-12" />

  {/* Text (H1 and paragraph) */}
  <div>
    <h1 className="text-3xl font-bold text-gray-900">WeatherPulse</h1>
    <p className="text-gray-500">Comprehensive weather monitoring and analysis.Powered by WaveFuels.</p>
  </div>
</div>

      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative flex-1 md:flex-none">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange} // Handle input changes
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearchClick();  // Trigger search on Enter key
              }
            }}
            className="w-full md:w-auto pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
            placeholder="Enter city"
          />

          {/* Display suggestions */}
          {suggestions.length > 0 && (
            <ul className="absolute z-50 left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)} // Trigger search directly when suggestion is clicked
                  className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:text-white"
                >
                  {suggestion.description}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          onClick={handleSearchClick} // Call handleSearchClick when the Search button is clicked
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all"
        >
          <Search className="h-6 w-6" /> {/* Using the Search icon */}
          
        </button>

        <button
  onClick={() => setLoading(true)}
  className="flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
>
  <RefreshCw className="h-5 w-5" />
</button>

      </div>
    </div>
  );
};

export default WeatherHeader;
