import React, { useState } from 'react';
import { 
  Code, 
  Smartphone, 
  Key, 
  Globe, 
  Database,
  Shield,
  Zap,
  Copy,
  CheckCircle
} from 'lucide-react';

const APIDocumentation: React.FC = () => {
  const [activeEndpoint, setActiveEndpoint] = useState('auth');
  const [copiedCode, setCopiedCode] = useState('');

  const endpoints = [
    {
      id: 'auth',
      name: 'Authentication',
      method: 'POST',
      path: '/api/auth/login',
      description: 'Authenticate field staff and get access token'
    },
    {
      id: 'leads',
      name: 'Leads',
      method: 'GET',
      path: '/api/leads',
      description: 'Retrieve leads assigned to field staff'
    },
    {
      id: 'customers',
      name: 'Customers',
      method: 'GET',
      path: '/api/customers',
      description: 'Get customer information and system details'
    },
    {
      id: 'monitoring',
      name: 'Monitoring',
      method: 'GET',
      path: '/api/systems/monitoring',
      description: 'Real-time system performance data'
    },
    {
      id: 'maintenance',
      name: 'Maintenance',
      method: 'POST',
      path: '/api/maintenance/report',
      description: 'Submit maintenance reports from field'
    }
  ];

  const codeExamples = {
    auth: `// Authentication
const response = await fetch('https://api.solartech-pro.com/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'technician@solartech-pro.com',
    password: 'your_password'
  })
});

const { token, user } = await response.json();`,

    leads: `// Get assigned leads
const response = await fetch('https://api.solartech-pro.com/leads', {
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json'
  }
});

const leads = await response.json();`,

    customers: `// Get customer system details
const response = await fetch('https://api.solartech-pro.com/customers/1247', {
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json'
  }
});

const customer = await response.json();`,

    monitoring: `// Real-time system monitoring
const response = await fetch('https://api.solartech-pro.com/systems/1247/monitoring', {
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json'
  }
});

const systemData = await response.json();`,

    maintenance: `// Submit maintenance report
const response = await fetch('https://api.solartech-pro.com/maintenance/report', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${token}\`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    systemId: '1247',
    technicianId: 'tech_001',
    reportType: 'routine_maintenance',
    issues: [],
    completedTasks: ['panel_cleaning', 'inverter_check'],
    notes: 'System operating normally'
  })
});

const result = await response.json();`
  };

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(''), 2000);
  };

  const mobileFeatures = [
    {
      icon: Key,
      title: 'Secure Authentication',
      description: 'OAuth 2.0 and JWT token-based authentication for field staff'
    },
    {
      icon: Database,
      title: 'Real-time Data Sync',
      description: 'Live synchronization with CRM and monitoring systems'
    },
    {
      icon: Shield,
      title: 'Role-based Access',
      description: 'Granular permissions based on technician roles and responsibilities'
    },
    {
      icon: Zap,
      title: 'Offline Capability',
      description: 'Continue working offline with automatic sync when connected'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mobile API Documentation</h1>
          <p className="text-gray-600 mt-1">RESTful API for React Native mobile application integration.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm font-medium text-green-600">API Status: Active</div>
            <div className="text-xs text-gray-500">Version 2.1.0</div>
          </div>
        </div>
      </div>

      {/* API Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Endpoints', value: '24', icon: Globe, color: 'bg-blue-500' },
          { title: 'Active API Keys', value: '18', icon: Key, color: 'bg-green-500' },
          { title: 'Daily Requests', value: '12.4K', icon: Zap, color: 'bg-yellow-500' },
          { title: 'Mobile Users', value: '67', icon: Smartphone, color: 'bg-purple-500' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile App Features */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Mobile App Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mobileFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                  <p className="text-gray-600 text-sm mt-1">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* API Endpoints */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Endpoint List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">API Endpoints</h3>
          <div className="space-y-2">
            {endpoints.map((endpoint) => (
              <button
                key={endpoint.id}
                onClick={() => setActiveEndpoint(endpoint.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  activeEndpoint === endpoint.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{endpoint.name}</span>
                  <span className={`px-2 py-1 text-xs rounded ${
                    endpoint.method === 'GET' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {endpoint.method}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mt-1 font-mono">{endpoint.path}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Code Example */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Code Example</h3>
            <button
              onClick={() => copyToClipboard(codeExamples[activeEndpoint as keyof typeof codeExamples], activeEndpoint)}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {copiedCode === activeEndpoint ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span>{copiedCode === activeEndpoint ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <pre className="text-green-400 text-sm">
              <code>{codeExamples[activeEndpoint as keyof typeof codeExamples]}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Base URL and Authentication */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Base URL</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <code className="text-sm text-gray-800">https://api.solartech-pro.com/v1</code>
          </div>
          <p className="text-gray-600 text-sm mt-3">
            All API requests should be made to this base URL with the appropriate endpoint path.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Authentication</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <code className="text-sm text-gray-800">Authorization: Bearer YOUR_TOKEN</code>
          </div>
          <p className="text-gray-600 text-sm mt-3">
            Include the JWT token in the Authorization header for all authenticated requests.
          </p>
        </div>
      </div>

      {/* Field Staff Tools */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Field Staff Mobile Tools</h3>
            <p className="text-gray-600 mt-1">
              Complete React Native mobile application for field technicians with offline capabilities,
              real-time data sync, and comprehensive system management tools.
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-blue-600 flex items-center">
              <Smartphone className="w-4 h-4 mr-2" />
              Mobile App Active
            </div>
            <div className="text-xs text-gray-500 mt-1">67 field technicians connected</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIDocumentation;