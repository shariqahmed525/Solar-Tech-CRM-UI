import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Sun, 
  FileText, 
  Settings, 
  Code,
  Menu,
  Zap
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  onTabChange, 
  collapsed, 
  onToggleCollapse 
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'leads', label: 'Lead Management', icon: UserPlus },
    { id: 'customers', label: 'Customer Management', icon: Users },
    { id: 'monitoring', label: 'Solar Monitoring', icon: Sun },
    { id: 'reports', label: 'Reports & Analytics', icon: FileText },
    { id: 'api', label: 'Mobile API', icon: Code },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={`fixed left-0 top-0 h-full bg-white shadow-lg transition-all duration-300 z-30 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">SolarTech Pro</h1>
              <p className="text-xs text-gray-500">CRM System</p>
            </div>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center px-4 py-3 text-left transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              <Icon className={`w-5 h-5 ${collapsed ? 'mx-auto' : 'mr-3'}`} />
              {!collapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            Version 2.1.0<br />
            © 2025 SolarTech Pro
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;