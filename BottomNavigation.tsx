import React from 'react';
import { Home, Gamepad2, Smartphone, Search, Bell } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'discover', name: 'Discover', icon: Home },
    { id: 'games', name: 'Games', icon: Gamepad2 },
    { id: 'apps', name: 'Apps', icon: Smartphone }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 px-4 py-2">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-teal-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{tab.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;