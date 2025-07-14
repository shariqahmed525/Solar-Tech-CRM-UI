import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  Calendar,
  User,
  MapPin,
  DollarSign,
  TrendingUp,
  X,
  Save,
  Edit,
  Trash2
} from 'lucide-react';

const LeadManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingLead, setEditingLead] = useState<any>(null);
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '(555) 123-4567',
      location: 'San Francisco, CA',
      status: 'new',
      source: 'Website',
      estimatedValue: 25000,
      lastContact: '2024-01-15',
      interest: 'Residential Solar',
      notes: 'Interested in 8kW system with battery backup'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      phone: '(555) 987-6543',
      location: 'Los Angeles, CA',
      status: 'qualified',
      source: 'Referral',
      estimatedValue: 45000,
      lastContact: '2024-01-14',
      interest: 'Commercial Solar',
      notes: 'Office building, 15kW system required'
    },
    {
      id: 3,
      name: 'Tech Solutions Inc.',
      email: 'contact@techsolutions.com',
      phone: '(555) 456-7890',
      location: 'San Diego, CA',
      status: 'proposal',
      source: 'Google Ads',
      estimatedValue: 120000,
      lastContact: '2024-01-13',
      interest: 'Industrial Solar',
      notes: 'Large warehouse facility, 50kW+ system'
    },
    {
      id: 4,
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      phone: '(555) 321-0987',
      location: 'Sacramento, CA',
      status: 'negotiation',
      source: 'Social Media',
      estimatedValue: 32000,
      lastContact: '2024-01-12',
      interest: 'Residential Solar + Battery',
      notes: 'Family home, interested in energy independence'
    }
  ]);

  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    status: 'new',
    source: 'Website',
    estimatedValue: '',
    interest: 'Residential Solar',
    notes: ''
  });

  const getStatusBadge = (status: string) => {
    const styles = {
      new: 'bg-blue-100 text-blue-800',
      qualified: 'bg-green-100 text-green-800',
      proposal: 'bg-yellow-100 text-yellow-800',
      negotiation: 'bg-purple-100 text-purple-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleAddLead = () => {
    if (newLead.name && newLead.email && newLead.phone) {
      const lead = {
        id: leads.length + 1,
        ...newLead,
        estimatedValue: parseInt(newLead.estimatedValue) || 0,
        lastContact: new Date().toISOString().split('T')[0]
      };
      setLeads([...leads, lead]);
      setNewLead({
        name: '',
        email: '',
        phone: '',
        location: '',
        status: 'new',
        source: 'Website',
        estimatedValue: '',
        interest: 'Residential Solar',
        notes: ''
      });
      setShowAddModal(false);
    }
  };

  const handleEditLead = (lead: any) => {
    setEditingLead({ ...lead, estimatedValue: lead.estimatedValue.toString() });
  };

  const handleUpdateLead = () => {
    if (editingLead) {
      setLeads(leads.map(lead => 
        lead.id === editingLead.id 
          ? { ...editingLead, estimatedValue: parseInt(editingLead.estimatedValue) || 0 }
          : lead
      ));
      setEditingLead(null);
    }
  };

  const handleDeleteLead = (id: number) => {
    setLeads(leads.filter(lead => lead.id !== id));
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const AddLeadModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Add New Lead</h2>
          <button
            onClick={() => setShowAddModal(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
            <input
              type="text"
              value={newLead.name}
              onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              value={newLead.email}
              onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter email address"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
            <input
              type="tel"
              value={newLead.phone}
              onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="(555) 123-4567"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              value={newLead.location}
              onChange={(e) => setNewLead({ ...newLead, location: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="City, State"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Lead Source</label>
            <select
              value={newLead.source}
              onChange={(e) => setNewLead({ ...newLead, source: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Google Ads">Google Ads</option>
              <option value="Social Media">Social Media</option>
              <option value="Trade Show">Trade Show</option>
              <option value="Cold Call">Cold Call</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Interest Type</label>
            <select
              value={newLead.interest}
              onChange={(e) => setNewLead({ ...newLead, interest: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Residential Solar">Residential Solar</option>
              <option value="Commercial Solar">Commercial Solar</option>
              <option value="Industrial Solar">Industrial Solar</option>
              <option value="Residential Solar + Battery">Residential Solar + Battery</option>
              <option value="Commercial Solar + Battery">Commercial Solar + Battery</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Value ($)</label>
            <input
              type="number"
              value={newLead.estimatedValue}
              onChange={(e) => setNewLead({ ...newLead, estimatedValue: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="25000"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={newLead.status}
              onChange={(e) => setNewLead({ ...newLead, status: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="new">New</option>
              <option value="qualified">Qualified</option>
              <option value="proposal">Proposal</option>
              <option value="negotiation">Negotiation</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
          <textarea
            value={newLead.notes}
            onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Additional notes about the lead..."
          />
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={() => setShowAddModal(false)}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAddLead}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>Add Lead</span>
          </button>
        </div>
      </div>
    </div>
  );

  const EditLeadModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Edit Lead</h2>
          <button
            onClick={() => setEditingLead(null)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {editingLead && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={editingLead.name}
                  onChange={(e) => setEditingLead({ ...editingLead, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={editingLead.email}
                  onChange={(e) => setEditingLead({ ...editingLead, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={editingLead.phone}
                  onChange={(e) => setEditingLead({ ...editingLead, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={editingLead.location}
                  onChange={(e) => setEditingLead({ ...editingLead, location: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={editingLead.status}
                  onChange={(e) => setEditingLead({ ...editingLead, status: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="new">New</option>
                  <option value="qualified">Qualified</option>
                  <option value="proposal">Proposal</option>
                  <option value="negotiation">Negotiation</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Value ($)</label>
                <input
                  type="number"
                  value={editingLead.estimatedValue}
                  onChange={(e) => setEditingLead({ ...editingLead, estimatedValue: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                value={editingLead.notes}
                onChange={(e) => setEditingLead({ ...editingLead, notes: e.target.value })}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setEditingLead(null)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateLead}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Update Lead</span>
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
          <h1 className="text-3xl font-bold text-gray-900">Lead Management</h1>
          <p className="text-gray-600 mt-1">Manage and track your solar leads through the sales pipeline.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Lead</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Leads', value: leads.length.toString(), change: '+12', icon: User, color: 'bg-blue-500' },
          { title: 'Qualified Leads', value: leads.filter(l => l.status === 'qualified').length.toString(), change: '+8', icon: TrendingUp, color: 'bg-green-500' },
          { title: 'Proposals Sent', value: leads.filter(l => l.status === 'proposal').length.toString(), change: '+5', icon: Calendar, color: 'bg-yellow-500' },
          { title: 'Est. Pipeline Value', value: `$${(leads.reduce((sum, lead) => sum + lead.estimatedValue, 0) / 1000).toFixed(0)}K`, change: '+15%', icon: DollarSign, color: 'bg-purple-500' }
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
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="qualified">Qualified</option>
                <option value="proposal">Proposal</option>
                <option value="negotiation">Negotiation</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Showing {filteredLeads.length} of {leads.length} leads
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Lead Information</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Contact</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Value</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Last Contact</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-semibold text-gray-900">{lead.name}</div>
                      <div className="text-sm text-gray-600 flex items-center mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {lead.location}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">{lead.interest}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-4 h-4 mr-2" />
                        {lead.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="w-4 h-4 mr-2" />
                        {lead.phone}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-2">
                      {getStatusBadge(lead.status)}
                      <div className="text-xs text-gray-500">Source: {lead.source}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-semibold text-gray-900">
                      ${lead.estimatedValue.toLocaleString()}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-600">{lead.lastContact}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleEditLead(lead)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Phone className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteLead(lead.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Zoho CRM Integration Status */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Zoho CRM Integration</h3>
            <p className="text-gray-600 mt-1">All leads are automatically synced with your Zoho CRM system.</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-green-600">✓ Connected</div>
            <div className="text-xs text-gray-500 mt-1">Last sync: 2 minutes ago</div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddModal && <AddLeadModal />}
      {editingLead && <EditLeadModal />}
    </div>
  );
};

export default LeadManagement;