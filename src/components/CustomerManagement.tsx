import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  Sun,
  Battery,
  Settings,
  TrendingUp,
  Plus,
  X,
  Save,
  Edit,
  Trash2
} from 'lucide-react';

const CustomerManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [systemFilter, setSystemFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<any>(null);
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'John & Mary Smith',
      email: 'smiths@email.com',
      phone: '(555) 123-4567',
      address: '123 Oak Street, San Francisco, CA 94102',
      systemType: 'Residential',
      systemSize: '8.5 kW',
      installDate: '2023-06-15',
      batteryBackup: true,
      monthlyProduction: '1,240 kWh',
      totalSavings: '$2,840',
      systemStatus: 'optimal'
    },
    {
      id: 2,
      name: 'Green Tech Corp',
      email: 'admin@greentech.com',
      phone: '(555) 987-6543',
      address: '456 Business Park Dr, Los Angeles, CA 90210',
      systemType: 'Commercial',
      systemSize: '125 kW',
      installDate: '2023-04-22',
      batteryBackup: true,
      monthlyProduction: '18,750 kWh',
      totalSavings: '$42,150',
      systemStatus: 'optimal'
    },
    {
      id: 3,
      name: 'Martinez Family',
      email: 'martinez.family@email.com',
      phone: '(555) 456-7890',
      address: '789 Sunset Blvd, San Diego, CA 92101',
      systemType: 'Residential',
      systemSize: '12.2 kW',
      installDate: '2023-08-10',
      batteryBackup: false,
      monthlyProduction: '1,830 kWh',
      totalSavings: '$4,110',
      systemStatus: 'attention'
    },
    {
      id: 4,
      name: 'Industrial Solutions Ltd',
      email: 'contact@indsolutions.com',
      phone: '(555) 321-0987',
      address: '321 Industrial Way, Sacramento, CA 95814',
      systemType: 'Industrial',
      systemSize: '500 kW',
      installDate: '2023-02-28',
      batteryBackup: true,
      monthlyProduction: '75,000 kWh',
      totalSavings: '$168,750',
      systemStatus: 'optimal'
    }
  ]);

  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    systemType: 'Residential',
    systemSize: '',
    installDate: '',
    batteryBackup: false,
    monthlyProduction: '',
    totalSavings: '',
    systemStatus: 'optimal'
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      optimal: 'bg-green-100 text-green-800',
      attention: 'bg-yellow-100 text-yellow-800',
      maintenance: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleAddCustomer = () => {
    if (newCustomer.name && newCustomer.email && newCustomer.phone) {
      const customer = {
        id: customers.length + 1,
        ...newCustomer,
        installDate: newCustomer.installDate || new Date().toISOString().split('T')[0]
      };
      setCustomers([...customers, customer]);
      setNewCustomer({
        name: '',
        email: '',
        phone: '',
        address: '',
        systemType: 'Residential',
        systemSize: '',
        installDate: '',
        batteryBackup: false,
        monthlyProduction: '',
        totalSavings: '',
        systemStatus: 'optimal'
      });
      setShowAddModal(false);
    }
  };

  const handleEditCustomer = (customer: any) => {
    setEditingCustomer({ ...customer });
  };

  const handleUpdateCustomer = () => {
    if (editingCustomer) {
      setCustomers(customers.map(customer => 
        customer.id === editingCustomer.id ? editingCustomer : customer
      ));
      setEditingCustomer(null);
    }
  };

  const handleDeleteCustomer = (id: number) => {
    setCustomers(customers.filter(customer => customer.id !== id));
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSystem = systemFilter === 'all' || customer.systemType.toLowerCase() === systemFilter.toLowerCase();
    return matchesSearch && matchesSystem;
  });

  const AddCustomerModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Add New Customer</h2>
          <button
            onClick={() => setShowAddModal(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name *</label>
            <input
              type="text"
              value={newCustomer.name}
              onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter customer name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              value={newCustomer.email}
              onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter email address"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
            <input
              type="tel"
              value={newCustomer.phone}
              onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="(555) 123-4567"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">System Type</label>
            <select
              value={newCustomer.systemType}
              onChange={(e) => setNewCustomer({ ...newCustomer, systemType: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Industrial">Industrial</option>
              <option value="Utility">Utility</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">System Size</label>
            <input
              type="text"
              value={newCustomer.systemSize}
              onChange={(e) => setNewCustomer({ ...newCustomer, systemSize: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="8.5 kW"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Install Date</label>
            <input
              type="date"
              value={newCustomer.installDate}
              onChange={(e) => setNewCustomer({ ...newCustomer, installDate: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Production</label>
            <input
              type="text"
              value={newCustomer.monthlyProduction}
              onChange={(e) => setNewCustomer({ ...newCustomer, monthlyProduction: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="1,240 kWh"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Savings</label>
            <input
              type="text"
              value={newCustomer.totalSavings}
              onChange={(e) => setNewCustomer({ ...newCustomer, totalSavings: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="$2,840"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <input
            type="text"
            value={newCustomer.address}
            onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="123 Main St, City, State ZIP"
          />
        </div>
        
        <div className="mt-4 flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={newCustomer.batteryBackup}
              onChange={(e) => setNewCustomer({ ...newCustomer, batteryBackup: e.target.checked })}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Battery Backup System</span>
          </label>
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => setShowAddModal(false)}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAddCustomer}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Add Customer</span>
          </button>
        </div>
      </div>
    </div>
  );

  const EditCustomerModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Edit Customer</h2>
          <button
            onClick={() => setEditingCustomer(null)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {editingCustomer && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                <input
                  type="text"
                  value={editingCustomer.name}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={editingCustomer.email}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={editingCustomer.phone}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">System Status</label>
                <select
                  value={editingCustomer.systemStatus}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, systemStatus: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="optimal">Optimal</option>
                  <option value="attention">Needs Attention</option>
                  <option value="maintenance">Maintenance Required</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Production</label>
                <input
                  type="text"
                  value={editingCustomer.monthlyProduction}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, monthlyProduction: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Savings</label>
                <input
                  type="text"
                  value={editingCustomer.totalSavings}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, totalSavings: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                type="text"
                value={editingCustomer.address}
                onChange={(e) => setEditingCustomer({ ...editingCustomer, address: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="mt-4 flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={editingCustomer.batteryBackup}
                  onChange={(e) => setEditingCustomer({ ...editingCustomer, batteryBackup: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Battery Backup System</span>
              </label>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setEditingCustomer(null)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateCustomer}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Update Customer</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer Management</h1>
          <p className="text-gray-600 mt-1">Monitor and manage your solar customers and their systems.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Customers', value: customers.length.toString(), change: '+18', icon: Users, color: 'bg-blue-500' },
          { title: 'Active Systems', value: customers.filter(c => c.systemStatus === 'optimal').length.toString(), change: '+15', icon: Sun, color: 'bg-yellow-500' },
          { title: 'Monthly Production', value: '2.4 GWh', change: '+8%', icon: TrendingUp, color: 'bg-green-500' },
          { title: 'Total Savings', value: '$5.2M', change: '+12%', icon: Battery, color: 'bg-purple-500' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-green-600">+{stat.change}</span>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={systemFilter}
                onChange={(e) => setSystemFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Systems</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="industrial">Industrial</option>
              </select>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {filteredCustomers.length} customers found
          </div>
        </div>
      </div>

      {/* Customer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{customer.name}</h3>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {customer.address}
                </div>
              </div>
              {getStatusBadge(customer.systemStatus)}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-sm text-gray-500">System Type</div>
                <div className="font-medium text-gray-900">{customer.systemType}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">System Size</div>
                <div className="font-medium text-gray-900">{customer.systemSize}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Monthly Production</div>
                <div className="font-medium text-green-600">{customer.monthlyProduction}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Total Savings</div>
                <div className="font-medium text-green-600">{customer.totalSavings}</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-1" />
                  {customer.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-1" />
                  {customer.phone}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {customer.batteryBackup && (
                  <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                    <Battery className="w-4 h-4" />
                  </div>
                )}
                <button 
                  onClick={() => handleEditCustomer(customer)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDeleteCustomer(customer.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                Installed: {customer.installDate} | Next maintenance: {new Date(new Date(customer.installDate).setFullYear(new Date(customer.installDate).getFullYear() + 1)).toISOString().split('T')[0]}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Zoho Integration Status */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Customer Data Integration</h3>
            <p className="text-gray-600 mt-1">Customer information is synchronized with Zoho CRM and Projects for seamless management.</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-green-600 flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              All systems connected
            </div>
            <div className="text-xs text-gray-500 mt-1">Real-time monitoring active</div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddModal && <AddCustomerModal />}
      {editingCustomer && <EditCustomerModal />}
    </div>
  );
};

export default CustomerManagement;