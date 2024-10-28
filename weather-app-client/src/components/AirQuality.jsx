import React from 'react';
import { AlertTriangle } from 'lucide-react';

const AirQuality = ({ airQuality }) => {
  // AQI breakpoints and descriptors based on EPA standards
  const getAirQualityLabel = (key, value) => {
    if (!value && value !== 0) return 'Unknown';
    
    const breakpoints = {
      PM2_5: [
        { max: 12.0, label: 'Good', color: 'green' },
        { max: 35.4, label: 'Moderate', color: 'yellow' },
        { max: 55.4, label: 'Unhealthy for Sensitive Groups', color: 'orange' },
        { max: 150.4, label: 'Unhealthy', color: 'red' },
        { max: 250.4, label: 'Very Unhealthy', color: 'purple' },
        { max: Infinity, label: 'Hazardous', color: 'maroon' }
      ],
      PM10: [
        { max: 54, label: 'Good', color: 'green' },
        { max: 154, label: 'Moderate', color: 'yellow' },
        { max: 254, label: 'Unhealthy for Sensitive Groups', color: 'orange' },
        { max: 354, label: 'Unhealthy', color: 'red' },
        { max: 424, label: 'Very Unhealthy', color: 'purple' },
        { max: Infinity, label: 'Hazardous', color: 'maroon' }
      ],
      O3: [
        { max: 50, label: 'Good', color: 'green' },
        { max: 100, label: 'Moderate', color: 'yellow' },
        { max: 150, label: 'Unhealthy for Sensitive Groups', color: 'orange' },
        { max: 200, label: 'Unhealthy', color: 'red' },
        { max: 300, label: 'Very Unhealthy', color: 'purple' },
        { max: Infinity, label: 'Hazardous', color: 'maroon' }
      ],
      NO2: [
        { max: 53, label: 'Good', color: 'green' },
        { max: 100, label: 'Moderate', color: 'yellow' },
        { max: 360, label: 'Unhealthy for Sensitive Groups', color: 'orange' },
        { max: 649, label: 'Unhealthy', color: 'red' },
        { max: 1249, label: 'Very Unhealthy', color: 'purple' },
        { max: Infinity, label: 'Hazardous', color: 'maroon' }
      ],
      SO2: [
        { max: 35, label: 'Good', color: 'green' },
        { max: 75, label: 'Moderate', color: 'yellow' },
        { max: 185, label: 'Unhealthy for Sensitive Groups', color: 'orange' },
        { max: 304, label: 'Unhealthy', color: 'red' },
        { max: 604, label: 'Very Unhealthy', color: 'purple' },
        { max: Infinity, label: 'Hazardous', color: 'maroon' }
      ],
      CO: [
        { max: 4.4, label: 'Good', color: 'green' },
        { max: 9.4, label: 'Moderate', color: 'yellow' },
        { max: 12.4, label: 'Unhealthy for Sensitive Groups', color: 'orange' },
        { max: 15.4, label: 'Unhealthy', color: 'red' },
        { max: 30.4, label: 'Very Unhealthy', color: 'purple' },
        { max: Infinity, label: 'Hazardous', color: 'maroon' }
      ],
      US_EPA_INDEX: [
        { max: 1, label: 'Good', color: 'green' },
        { max: 2, label: 'Moderate', color: 'yellow' },
        { max: 3, label: 'Unhealthy for Sensitive Groups', color: 'orange' },
        { max: 4, label: 'Unhealthy', color: 'red' },
        { max: 5, label: 'Very Unhealthy', color: 'purple' },
        { max: Infinity, label: 'Hazardous', color: 'maroon' }
      ],
      GB_DEFRA_INDEX: [
        { max: 3, label: 'Low', color: 'green' },
        { max: 6, label: 'Moderate', color: 'yellow' },
        { max: 9, label: 'High', color: 'red' },
        { max: Infinity, label: 'Very High', color: 'purple' }
      ]
    };

    const pollutant = key.toUpperCase();
    const levels = breakpoints[pollutant];
    
    if (!levels) return { label: 'Unknown', color: 'gray' };
    
    for (const level of levels) {
      if (value <= level.max) {
        return { label: level.label, color: level.color };
      }
    }
    
    return { label: 'Unknown', color: 'gray' };
  };

  const getOverallAirQuality = (airQuality) => {
    if (!airQuality) return { label: 'Unknown', color: 'gray' };

    // Use EPA index if available
    if (airQuality.us_epa_index) {
      return getAirQualityLabel('US_EPA_INDEX', airQuality.us_epa_index);
    }

    // Otherwise calculate based on individual pollutants
    const pollutants = ['pm2_5', 'pm10', 'o3', 'no2', 'so2', 'co'];
    const statusOrder = ['Good', 'Moderate', 'Unhealthy for Sensitive Groups', 'Unhealthy', 'Very Unhealthy', 'Hazardous'];
    
    let worstStatus = { label: 'Good', color: 'green' };
    
    pollutants.forEach(pollutant => {
      if (airQuality[pollutant]) {
        const status = getAirQualityLabel(pollutant.toUpperCase(), airQuality[pollutant]);
        if (statusOrder.indexOf(status.label) > statusOrder.indexOf(worstStatus.label)) {
          worstStatus = status;
        }
      }
    });
    
    return worstStatus;
  };

  const getBackgroundColor = (color) => {
    const colorMap = {
      'green': 'bg-green-100',
      'yellow': 'bg-yellow-100',
      'orange': 'bg-orange-100',
      'red': 'bg-red-100',
      'purple': 'bg-purple-100',
      'maroon': 'bg-red-200',
      'gray': 'bg-gray-100'
    };
    return colorMap[color] || 'bg-gray-100';
  };

  const getTextColor = (color) => {
    const colorMap = {
      'green': 'text-green-700',
      'yellow': 'text-yellow-700',
      'orange': 'text-orange-700',
      'red': 'text-red-700',
      'purple': 'text-purple-700',
      'maroon': 'text-red-900',
      'gray': 'text-gray-700'
    };
    return colorMap[color] || 'text-gray-700';
  };

  const overallStatus = airQuality ? getOverallAirQuality(airQuality) : { label: 'Unknown', color: 'gray' };

  const pollutantLabels = {
    pm2_5: 'PM2.5 (µg/m³)',
    pm10: 'PM10 (µg/m³)',
    o3: 'Ozone (ppb)',
    no2: 'Nitrogen Dioxide (ppb)',
    so2: 'Sulfur Dioxide (ppb)',
    co: 'Carbon Monoxide (ppm)',
    us_epa_index: 'US EPA Index',
    gb_defra_index: 'UK DEFRA Index'
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 relative">
      <div className={`absolute top-2 right-2 px-2 py-1 rounded-lg font-bold text-xs ${getBackgroundColor(overallStatus.color)} ${getTextColor(overallStatus.color)}`}>
        {overallStatus.label}
      </div>

      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-lg font-medium text-gray-900">Air Quality</h2>
        <AlertTriangle className="h-4 w-4 text-yellow-500" />
      </div>

      {airQuality ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {Object.entries(airQuality).map(([key, value]) => {
            if (value === null || value === undefined) return null;
            const status = getAirQualityLabel(key.toUpperCase(), value);
            return (
              <div key={key} className="p-2 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-500">{pollutantLabels[key] || key.toUpperCase()}</p>
                <p className="text-base font-bold">{typeof value === 'number' ? value.toFixed(1) : value}</p>
                <p className={`text-sm font-medium ${getTextColor(status.color)}`}>
                  {status.label}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center h-24 text-gray-500">
          <p>Air quality data not available</p>
        </div>
      )}
    </div>
  );
};

export default AirQuality;