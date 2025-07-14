import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Zap, 
  DollarSign, 
  Sun, 
  Activity,
  ArrowUp,
  ArrowDown,
  Battery,
  Calendar,
  MapPin
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, RadialBarChart, RadialBar } from 'recharts';

const Dashboard: React.FC = () => {
  const energyData = [
    { name: 'Jan', production: 4200, consumption: 3800, savings: 420 },
    { name: 'Feb', production: 4500, consumption: 4100, savings: 450 },
    { name: 'Mar', production: 5200, consumption: 4600, savings: 520 },
    { name: 'Apr', production: 5800, consumption: 5200, savings: 580 },
    { name: 'May', production: 6200, consumption: 5600, savings: 620 },
    { name: 'Jun', production: 6800, consumption: 6100, savings: 680 },
    { name: 'Jul', production: 7200, consumption: 6400, savings: 720 },
    { name: 'Aug', production: 6900, consumption: 6200, savings: 690 },
  ];

  const leadData = [
    { name: 'New', value: 45, color: '#3B82F6' },
    { name: 'Qualified', value: 32, color: '#10B981' },
    { name: 'Proposal', value: 18, color: '#F59E0B' },
    { name: 'Closed Won', value: 25, color: '#059669' },
    { name: 'Closed Lost', value: 12, color: '#EF4444' },
  ];

  const systemData = [
    { name: 'Residential', installs: 28, revenue: 420000, efficiency: 94.2 },
    { name: 'Commercial', installs: 12, revenue: 680000, efficiency: 92.8 },
    { name: 'Industrial', installs: 5, revenue: 950000, efficiency: 96.1 },
    { name: 'Utility', installs: 2, revenue: 1200000, efficiency: 95.5 },
  ];

  const monthlyGrowthData = [
    { month: 'Jan', customers: 120, revenue: 180000, systems: 15 },
    { month: 'Feb', customers: 135, revenue: 210000, systems: 18 },
    { month: 'Mar', customers: 158, revenue: 285000, systems: 24 },
    { month: 'Apr', customers: 182, revenue: 320000, systems: 28 },
    { month: 'May', customers: 210, revenue: 390000, systems: 32 },
    { month: 'Jun', customers: 245, revenue: 450000, systems: 38 },
  ];

  const efficiencyData = [
    { name: 'System Efficiency', value: 94, fill: '#10B981' },
    { name: 'Customer Satisfaction', value: 96, fill: '#3B82F6' },
    { name: 'Installation Quality', value: 98, fill: '#F59E0B' },
    { name: 'Maintenance Score', value: 92, fill: '#8B5CF6' },
  ];

  const stats = [
    {
      title: 'Total Energy Production',
      value: '45.2 MW',
      change: '+18.5%',
      positive: true,
      icon: Sun,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Active Customers',
      value: '1,847',
      change: '+12.8%',
      positive: true,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Monthly Revenue',
      value: '$3.2M',
      change: '+22.3%',
      positive: true,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'System Efficiency',
      value: '96.8%',
      change: '+2.1%',
      positive: true,
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Battery Storage',
      value: '12.8 MWh',
      change: '+15.2%',
      positive: true,
      icon: Battery,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    {
      title: 'Installations This Month',
      value: '38',
      change: '+8',
      positive: true,
      icon: Calendar,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const recentActivities = [
    { action: 'New lead created', customer: 'Johnson Family', location: 'San Francisco, CA', time: '2 minutes ago', type: 'lead', value: '$45,000' },
    { action: 'System monitoring alert', customer: 'System #1247', location: 'Oakland, CA', time: '15 minutes ago', type: 'alert', value: 'Low efficiency' },
    { action: 'Installation completed', customer: 'ABC Corp', location: 'San Jose, CA', time: '1 hour ago', type: 'install', value: '$125,000' },
    { action: 'Proposal sent', customer: 'Green Energy LLC', location: 'Sacramento, CA', time: '3 hours ago', type: 'proposal', value: '$89,000' },
    { action: 'Maintenance scheduled', customer: 'Smith Residence', location: 'Palo Alto, CA', time: '5 hours ago', type: 'maintenance', value: 'Routine check' },
    { action: 'Payment received', customer: 'Tech Solutions Inc', location: 'Mountain View, CA', time: '6 hours ago', type: 'payment', value: '$67,500' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your solar business overview for today.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-200">
            <Activity className="w-4 h-4 text-green-500" />
            <span>All systems operational</span>
          </div>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`${stat.bgColor} rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200`}>
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg bg-white shadow-sm ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  stat.positive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.positive ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-700 text-sm mt-1 font-medium">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Energy Production Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Energy Production & Savings</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Production</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Savings</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={energyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip formatter={(value, name) => [`${value} kWh`, name === 'production' ? 'Production' : 'Savings']} />
              <Area type="monotone" dataKey="production" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="savings" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.8} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Lead Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Lead Pipeline Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={leadData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {leadData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Growth Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Growth Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Line type="monotone" dataKey="customers" stroke="#3B82F6" strokeWidth={3} name="Customers" />
              <Line type="monotone" dataKey="systems" stroke="#10B981" strokeWidth={3} name="Systems" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={efficiencyData}>
              <RadialBar dataKey="value" cornerRadius={10} fill="#8884d8" />
              <Tooltip />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* System Installations by Type */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">System Installations & Revenue by Type</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={systemData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip formatter={(value, name) => [
              name === 'installs' ? `${value} installs` : 
              name === 'revenue' ? `$${value.toLocaleString()}` : `${value}%`,
              name === 'installs' ? 'Installations' : 
              name === 'revenue' ? 'Revenue' : 'Efficiency'
            ]} />
            <Bar dataKey="installs" fill="#3B82F6" name="installs" />
            <Bar dataKey="efficiency" fill="#10B981" name="efficiency" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
        </div>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 border border-gray-100">
              <div className={`w-3 h-3 rounded-full ${
                activity.type === 'lead' ? 'bg-blue-500' :
                activity.type === 'alert' ? 'bg-red-500' :
                activity.type === 'install' ? 'bg-green-500' : 
                activity.type === 'proposal' ? 'bg-yellow-500' :
                activity.type === 'maintenance' ? 'bg-purple-500' : 'bg-indigo-500'
              }`}></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
                <div className="flex items-center space-x-4 mt-1">
                  <p className="text-sm text-gray-600">{activity.customer}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin className="w-3 h-3 mr-1" />
                    {activity.location}
                  </div>
                  <span className="text-sm font-medium text-green-600">{activity.value}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;