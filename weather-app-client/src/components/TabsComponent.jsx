import { Droplets, ArrowDown, Eye, Sun, Cloud } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TabsComponent = ({ activeTab, setActiveTab, temperatureHistory, weatherData }) => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="border-b border-gray-200">
        <div className="flex">
          {['temperature', 'conditions', 'forecast'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === tab
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Analysis
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* Temperature Analysis Tab */}
        {activeTab === 'temperature' && (
          <div className="bg-white">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Temperature Trends</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={temperatureHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="temp" stroke="#2563eb" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Conditions Analysis Tab */}
        {activeTab === 'conditions' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Humidity and Pressure */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium mb-4">Humidity & Pressure</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    <span>Humidity</span>
                  </div>
                  <span className="font-bold">{weatherData?.humidity}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ArrowDown className="h-5 w-5 text-green-500" />
                    <span>Pressure</span>
                  </div>
                  <span className="font-bold">{weatherData?.pressure_mb} mb</span>
                </div>
              </div>
            </div>

            {/* Visibility and UV Index */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium mb-4">Visibility & UV</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-purple-500" />
                    <span>Visibility</span>
                  </div>
                  <span className="font-bold">{weatherData?.vis_km} km</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sun className="h-5 w-5 text-yellow-500" />
                    <span>UV Index</span>
                  </div>
                  <span className="font-bold">{weatherData?.uv}</span>
                </div>
              </div>
            </div>

            {/* Cloud Coverage */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium mb-4">Cloud Coverage</h3>
              <div className="flex items-center justify-between">
                <Cloud className="h-8 w-8 text-gray-500" />
                <span className="text-2xl font-bold">{weatherData?.cloud}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Forecast Analysis Tab */}
        {activeTab === 'forecast' && (
          <div className="bg-white">
            <p className="text-center text-gray-500">24-hour forecast data will be displayed here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabsComponent;
