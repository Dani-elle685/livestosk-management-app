import React from 'react';
import { User, Shield, Bell, CreditCard, Search } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'account', label: 'Account Settings', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payment', label: 'Payment Settings', icon: CreditCard },
  ];

  return (
    <>
      {/* Sidebar */}
      <div className={`
        h-full w-full bg-gray-50
        transform transition-transform duration-300 ease-in-out
      `}>
        <div className="p-6 w-full">
            <div className="flex items-center gap-3 mb-8">
            <h1 className="text-lg font-semibold text-gray-900">SETTINGS</h1>
          </div>
          <nav className="space-y-2 flex md:flex-col  w-full overflow-x-auto md:w-auto md:overflow-x-none">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors
                    ${isActive 
                      ? 'text-red-600 bg-red-50 border-l-4 border-red-600' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;