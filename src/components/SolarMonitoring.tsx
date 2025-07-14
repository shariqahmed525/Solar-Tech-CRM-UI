import React, { useState } from 'react';
import { 
  Sun, 
  Battery, 
  Zap, 
  TrendingUp, 
  AlertTriangle,
  Activity,
  Cloud,
  Thermometer
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

const SolarMonitoring: React.FC = () => {
  const [selectedSystem, setSelectedSystem] = useState('all');
  const [timeRange, setTimeRange] = useState('today');

  const productionData = [
    { time: '06:00', production: 0, consumption: 2.1, grid: 2.1 },
    { time: '08:00', production: 3.2, consumption: 2.8, grid: -0.4 },
    { time: '10:00', production: 8.5, consumption: 3.1, grid: -5.4 },
    { time: '12:00', production: 12.8, consumption: 4.2, grid: -8.6 },
    { time: '14:00', production: 11.2, consumption: 3.8, grid: -7.4 },
    { time: '16:00', production: 7.9, consumption: 4.5, grid: -3.4 },
    { time: '18:00', production: 2.1, consumption: 6.2, grid: 4.1 },
    { time: '20:00', production: 0, consumption: 4.8, grid: 4.8 },
  ];

  const weeklyData = [
    { day: 'Mon', production: 85.2, target: 90 },
    { day: 'Tue', production: 92.1, target: 90 },
    { day: 'Wed', production: 78.5, target: 90 },
    { day: 'Thu', production: 95.8, target: 90 },
    { day: 'Fri', production: 88.9, target: 90 },
    { day: 'Sat', production: 91.2, target: 90 },
    { day: 'Sun', production: 89.6, target: 90 },
  ];

  const systemAlerts = [
    { id: 1, system: 'Residential #1247', type: 'warning', message: 'Panel efficiency below 85%', time: '10 min ago' },
    { id: 2, system: 'Commercial #3456', type: 'info', message: 'Scheduled maintenance due', time: '2 hours ago' },
    { id: 3, system: 'Industrial #7890', type: 'success', message: 'Peak production achieved', time: '4 hours ago' },
  ];

  const systemOverview = [
    {
      name: 'Total Systems',
      value: '1,247',
      change: '+18',
      status: 'optimal',
      icon: Sun,
      color: 'text-yellow-600'
    },
    {
      name: 'Current Production',
      value: '4.2 MW',
      change: '+12%',
      status: 'optimal',
      icon: Zap,
      color: 'text-blue-600'
    },
    {
      name: 'Battery Storage',
      value: '85%',
      change: '+5%',
      status: 'optimal',
      icon: Battery,
      color: 'text-green-600'
    },
    {
      name: 'System Efficiency',
      value: '92.8%',
      change: '-1.2%',
      status: 'attention',
      icon: Activity,
      color: 'text-purple-600'
    }
  ];

  const weatherData = {
    temperature: '72°F',
    humidity: '45%',
    cloudCover: '15%',
    uvIndex: '8.2',
    forecast: 'Sunny'
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Solar System Monitoring</h1>
          <p className="text-gray-600 mt-1">Real-time monitoring and performance analytics for all solar installations.</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedSystem}
            onChange={(e) => setSelectedSystem(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Systems</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="industrial">Industrial</option>
          </select>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* System Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {systemOverview.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  stat.status === 'optimal' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    stat.status === 'optimal' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-600 text-sm mt-1">{stat.name}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Weather Conditions */}
      <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-xl border border-blue-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Cloud className="w-5 h-5 mr-2" />
              Current Weather Conditions
            </h3>
            <p className="text-gray-600 mt-1">Optimal conditions for solar energy production</p>
          </div>
          <div className="grid grid-cols-5 gap-6 text-center">
            <div>
              <Thermometer className="w-5 h-5 mx-auto text-red-500 mb-1" />
              <div className="font-bold text-gray-900">{weatherData.temperature}</div>
              <div className="text-xs text-gray-500">Temperature</div>
            </div>
            <div>
              <Sun className="w-5 h-5 mx-auto text-yellow-500 mb-1" />
              <div className="font-bold text-gray-900">{weatherData.uvIndex}</div>
              <div className="text-xs text-gray-500">UV Index</div>
            </div>
            <div>
              <Cloud className="w-5 h-5 mx-auto text-gray-500 mb-1" />
              <div className="font-bold text-gray-900">{weatherData.cloudCover}</div>
              <div className="text-xs text-gray-500">Cloud Cover</div>
            </div>
            <div>
              <Activity className="w-5 h-5 mx-auto text-blue-500 mb-1" />
              <div className="font-bold text-gray-900">{weatherData.humidity}</div>
              <div className="text-xs text-gray-500">Humidity</div>
            </div>
            <div>
              <TrendingUp className="w-5 h-5 mx-auto text-green-500 mb-1" />
              <div className="font-bold text-gray-900">{weatherData.forecast}</div>
              <div className="text-xs text-gray-500">Forecast</div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Production */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Real-time Production vs Consumption</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={productionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip formatter={(value, name) => [`${value} kW`, name === 'production' ? 'Production' : name === 'consumption' ? 'Consumption' : 'Grid']} />
              <Area type="monotone" dataKey="production" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
              <Area type="monotone" dataKey="consumption" stackId="2" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} />
              <Line type="monotone" dataKey="grid" stroke="#6B7280" strokeWidth={2} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip formatter={(value, name) => [`${value} kWh`, name === 'production' ? 'Actual' : 'Target']} />
              <Bar dataKey="production" fill="#3B82F6" />
              <Bar dataKey="target" fill="#E5E7EB" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* System Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">System Alerts & Notifications</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
        </div>
        <div className="space-y-4">
          {systemAlerts.map((alert) => (
            <div key={alert.id} className="flex items-start space-x-4 p-4 rounded-lg border border-gray-200 hover:bg-gray-50">
              <div className={`p-2 rounded-lg ${
                alert.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                alert.type === 'info' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
              }`}>
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{alert.system}</div>
                <div className="text-gray-600 text-sm mt-1">{alert.message}</div>
              </div>
              <div className="text-xs text-gray-500">{alert.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Enphase Integration Status */}
      <div className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-xl border border-green-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Enphase API Integration</h3>
            <p className="text-gray-600 mt-1">Real-time data streaming from all Enphase microinverters and monitoring systems.</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-green-600 flex items-center">
              <Activity className="w-4 h-4 mr-2" />
              Live Data Feed Active
            </div>
            <div className="text-xs text-gray-500 mt-1">1,247 systems monitored | Data updated every 15 seconds</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarMonitoring;