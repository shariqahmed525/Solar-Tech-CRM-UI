import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  TrendingUp,
  BarChart3,
  PieChart,
  FileSpreadsheet
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

const Reports: React.FC = () => {
  const [reportType, setReportType] = useState('performance');
  const [dateRange, setDateRange] = useState('month');

  const performanceData = [
    { month: 'Jan', revenue: 180000, installations: 15, efficiency: 92.5 },
    { month: 'Feb', revenue: 210000, installations: 18, efficiency: 91.8 },
    { month: 'Mar', revenue: 285000, installations: 24, efficiency: 93.2 },
    { month: 'Apr', revenue: 320000, installations: 28, efficiency: 94.1 },
    { month: 'May', revenue: 390000, installations: 32, efficiency: 93.8 },
    { month: 'Jun', revenue: 450000, installations: 38, efficiency: 94.5 },
  ];

  const systemTypeData = [
    { name: 'Residential', value: 68, color: '#3B82F6' },
    { name: 'Commercial', value: 24, color: '#10B981' },
    { name: 'Industrial', value: 8, color: '#F59E0B' },
  ];

  const reportTemplates = [
    {
      id: 1,
      name: 'Monthly Performance Report',
      description: 'Comprehensive system performance and revenue analysis',
      lastGenerated: '2024-01-15',
      type: 'Performance',
      icon: TrendingUp
    },
    {
      id: 2,
      name: 'Customer Satisfaction Survey',
      description: 'Customer feedback and satisfaction metrics',
      lastGenerated: '2024-01-10',
      type: 'Customer',
      icon: FileText
    },
    {
      id: 3,
      name: 'Installation Pipeline Report',
      description: 'Current projects and installation schedules',
      lastGenerated: '2024-01-12',
      type: 'Operations',
      icon: BarChart3
    },
    {
      id: 4,
      name: 'Financial Summary',
      description: 'Revenue, costs, and profitability analysis',
      lastGenerated: '2024-01-08',
      type: 'Financial',
      icon: PieChart
    }
  ];

  const automatedReports = [
    {
      name: 'Daily Production Summary',
      frequency: 'Daily at 8:00 AM',
      recipients: 'operations@ies-solar.com',
      status: 'active'
    },
    {
      name: 'Weekly Lead Report',
      frequency: 'Monday at 9:00 AM',
      recipients: 'sales@ies-solar.com',
      status: 'active'
    },
    {
      name: 'Monthly Financial Report',
      frequency: '1st of every month',
      recipients: 'finance@ies-solar.com',
      status: 'active'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Generate comprehensive reports and analyze business performance.</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <FileSpreadsheet className="w-5 h-5" />
            <span>Export to Excel</span>
          </button>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Generate Report</span>
          </button>
        </div>
      </div>

      {/* Report Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="performance">Performance Reports</option>
                <option value="financial">Financial Reports</option>
                <option value="customer">Customer Reports</option>
                <option value="operations">Operations Reports</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue & Installations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue & Installation Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3B82F6" name="Revenue ($)" />
              <Bar dataKey="installations" fill="#10B981" name="Installations" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* System Type Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Installation Distribution by Type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={systemTypeData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {systemTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Report Templates */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Report Templates</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Create New Template</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reportTemplates.map((template) => {
            const Icon = template.icon;
            return (
              <div key={template.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{template.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {template.type}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Last generated: {template.lastGenerated}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <FileText className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Automated Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Automated Report Schedule</h3>
        <div className="space-y-4">
          {automatedReports.map((report, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{report.name}</h4>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                  <span>Frequency: {report.frequency}</span>
                  <span>Recipients: {report.recipients}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  report.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {report.status}
                </span>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spreadsheet Automation */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Spreadsheet Automation</h3>
            <p className="text-gray-600 mt-1">Automated data export to Excel, Google Sheets, and custom formats for seamless integration.</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-green-600 flex items-center">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Auto-sync enabled
            </div>
            <div className="text-xs text-gray-500 mt-1">Last export: 5 minutes ago</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;