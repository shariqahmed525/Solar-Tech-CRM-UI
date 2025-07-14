import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import LeadManagement from './components/LeadManagement';
import CustomerManagement from './components/CustomerManagement';
import SolarMonitoring from './components/SolarMonitoring';
import Reports from './components/Reports';
import APIDocumentation from './components/APIDocumentation';
import Settings from './components/Settings';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'leads':
        return <LeadManagement />;
      case 'customers':
        return <CustomerManagement />;
      case 'monitoring':
        return <SolarMonitoring />;
      case 'reports':
        return <Reports />;
      case 'api':
        return <APIDocumentation />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className={`flex-1 overflow-auto transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        {renderContent()}
      </main>
    </div>
  );
}

export default App;