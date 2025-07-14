import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Database,
  Globe,
  Key,
  Mail,
  Smartphone,
  Cloud,
  Save,
  Check,
  X
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    systemAlerts: true,
    maintenanceReminders: true,
    leadNotifications: true,
    reportSchedule: 'weekly'
  });
  
  const [companyInfo, setCompanyInfo] = useState({
    name: 'SolarTech Pro',
    type: 'Solar Installation & Service',
    email: 'admin@solartech-pro.com',
    phone: '(555) 123-4567',
    currency: 'USD',
    timezone: 'Pacific Time (PT)'
  });

  const [users, setUsers] = useState([
    { id: 1, name: 'John Admin', email: 'john@solartech-pro.com', role: 'Administrator', status: 'active' },
    { id: 2, name: 'Sarah Manager', email: 'sarah@solartech-pro.com', role: 'Manager', status: 'active' },
    { id: 3, name: 'Mike Technician', email: 'mike@solartech-pro.com', role: 'Technician', status: 'active' },
    { id: 4, name: 'Lisa Sales', email: 'lisa@solartech-pro.com', role: 'Sales Rep', status: 'inactive' }
  ]);

  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Technician' });
  const [savedMessage, setSavedMessage] = useState('');

  const sections = [
    { id: 'general', label: 'General', icon: SettingsIcon },
    { id: 'users', label: 'User Management', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'integrations', label: 'Integrations', icon: Database },
    { id: 'api', label: 'API Settings', icon: Globe },
  ];

  const integrationStatus = [
    { name: 'Zoho CRM', status: 'connected', lastSync: '2 minutes ago', icon: Database },
    { name: 'Zoho Projects', status: 'connected', lastSync: '5 minutes ago', icon: Database },
    { name: 'Enphase API', status: 'connected', lastSync: '30 seconds ago', icon: Cloud },
    { name: 'NestJS Backend', status: 'connected', lastSync: 'Real-time', icon: Globe },
    { name: 'AWS Amplify', status: 'connected', lastSync: 'Continuous', icon: Cloud },
  ];

  const showSavedMessage = (message: string) => {
    setSavedMessage(message);
    setTimeout(() => setSavedMessage(''), 3000);
  };

  const handleSaveGeneral = () => {
    showSavedMessage('General settings saved successfully!');
  };

  const handleSaveNotifications = () => {
    showSavedMessage('Notification preferences saved!');
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([...users, { 
        id: users.length + 1, 
        ...newUser, 
        status: 'active' 
      }]);
      setNewUser({ name: '', email: '', role: 'Technician' });
      setShowAddUser(false);
      showSavedMessage('User added successfully!');
    }
  };

  const handleToggleUserStatus = (id: number) => {
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
    showSavedMessage('User status updated!');
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Company Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <input
              type="text"
              value={companyInfo.name}
              onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
            <select 
              value={companyInfo.type}
              onChange={(e) => setCompanyInfo({ ...companyInfo, type: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>Solar Installation & Service</option>
              <option>Solar Sales</option>
              <option>Energy Consulting</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Contact</label>
            <input
              type="email"
              value={companyInfo.email}
              onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={companyInfo.phone}
              onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <button 
          onClick={handleSaveGeneral}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">System Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Default Currency</h4>
              <p className="text-sm text-gray-600">Currency used for financial calculations</p>
            </div>
            <select 
              value={companyInfo.currency}
              onChange={(e) => setCompanyInfo({ ...companyInfo, currency: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Time Zone</h4>
              <p className="text-sm text-gray-600">System-wide time zone setting</p>
            </div>
            <select 
              value={companyInfo.timezone}
              onChange={(e) => setCompanyInfo({ ...companyInfo, timezone: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Pacific Time (PT)">Pacific Time (PT)</option>
              <option value="Mountain Time (MT)">Mountain Time (MT)</option>
              <option value="Central Time (CT)">Central Time (CT)</option>
              <option value="Eastern Time (ET)">Eastern Time (ET)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
          <button 
            onClick={() => setShowAddUser(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <User className="w-4 h-4" />
            <span>Add User</span>
          </button>
        </div>
        
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{user.name}</h4>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.status}
                </span>
                <button 
                  onClick={() => handleToggleUserStatus(user.id)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  {user.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Add New User</h2>
              <button
                onClick={() => setShowAddUser(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Administrator">Administrator</option>
                  <option value="Manager">Manager</option>
                  <option value="Sales Rep">Sales Rep</option>
                  <option value="Technician">Technician</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddUser(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Email Alerts</h4>
              <p className="text-sm text-gray-600">Receive important notifications via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.emailAlerts}
                onChange={(e) => setNotifications({ ...notifications, emailAlerts: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">SMS Alerts</h4>
              <p className="text-sm text-gray-600">Receive urgent notifications via SMS</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.smsAlerts}
                onChange={(e) => setNotifications({ ...notifications, smsAlerts: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">System Alerts</h4>
              <p className="text-sm text-gray-600">Solar system performance and maintenance alerts</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.systemAlerts}
                onChange={(e) => setNotifications({ ...notifications, systemAlerts: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Lead Notifications</h4>
              <p className="text-sm text-gray-600">New leads and pipeline updates</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications.leadNotifications}
                onChange={(e) => setNotifications({ ...notifications, leadNotifications: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Report Schedule</h4>
              <p className="text-sm text-gray-600">Automated report delivery frequency</p>
            </div>
            <select
              value={notifications.reportSchedule}
              onChange={(e) => setNotifications({ ...notifications, reportSchedule: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="never">Never</option>
            </select>
          </div>
        </div>
        
        <button 
          onClick={handleSaveNotifications}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Preferences</span>
        </button>
      </div>
    </div>
  );

  const renderIntegrations = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Integration Status</h3>
        <div className="space-y-4">
          {integrationStatus.map((integration, index) => {
            const Icon = integration.icon;
            return (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{integration.name}</h4>
                    <p className="text-sm text-gray-600">Last sync: {integration.lastSync}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center space-x-1">
                    <Check className="w-3 h-3" />
                    <span>{integration.status}</span>
                  </span>
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Configure
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Available Integrations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'Salesforce CRM', description: 'Alternative CRM integration', status: 'available' },
            { name: 'HubSpot', description: 'Marketing automation platform', status: 'available' },
            { name: 'QuickBooks', description: 'Financial management integration', status: 'available' },
            { name: 'Slack', description: 'Team communication integration', status: 'available' },
          ].map((integration, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900">{integration.name}</h4>
              <p className="text-sm text-gray-600 mt-1">{integration.description}</p>
              <button className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAPISettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">API Configuration</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">API Base URL</label>
            <input
              type="url"
              defaultValue="https://api.solartech-pro.com/v1"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rate Limiting</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Requests per minute</label>
                <input
                  type="number"
                  defaultValue="1000"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Burst limit</label>
                <input
                  type="number"
                  defaultValue="2000"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">API Keys</h3>
        <div className="space-y-4">
          {[
            { name: 'Mobile App (Production)', key: 'stp_****_prod_****_2024', created: '2024-01-01', lastUsed: '2 minutes ago' },
            { name: 'Mobile App (Development)', key: 'stp_****_dev_****_2024', created: '2024-01-01', lastUsed: '1 hour ago' },
            { name: 'Third-party Integration', key: 'stp_****_int_****_2024', created: '2024-01-15', lastUsed: '5 minutes ago' },
          ].map((apiKey, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{apiKey.name}</h4>
                <p className="text-sm text-gray-600 font-mono">{apiKey.key}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Created: {apiKey.created} | Last used: {apiKey.lastUsed}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  Copy
                </button>
                <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  Revoke
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Generate New API Key
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneralSettings();
      case 'users':
        return renderUserManagement();
      case 'notifications':
        return renderNotifications();
      case 'integrations':
        return renderIntegrations();
      case 'api':
        return renderAPISettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your system configuration and integrations.</p>
        </div>
        {savedMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center space-x-2">
            <Check className="w-5 h-5" />
            <span>{savedMessage}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Settings</h3>
          <nav className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{section.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {renderContent()}
        </div>
      </div>

      {/* NestJS & AWS Integration Status */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Infrastructure Status</h3>
            <p className="text-gray-600 mt-1">
              NestJS backend services running on AWS Amplify with Docker containerization.
              Full CRM automation and real-time API connectivity.
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-green-600 flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              All systems operational
            </div>
            <div className="text-xs text-gray-500 mt-1">99.9% uptime | Auto-scaling enabled</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;