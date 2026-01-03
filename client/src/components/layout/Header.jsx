import React from 'react';
import { Search, Maximize2, Bell, Settings } from 'lucide-react';

const Header = ({ userName = 'Bridget Gafa' }) => {
  return (
    <header className="bg-[#0f172a] border-b border-gray-800 px-6 py-4 flex items-center justify-between">
      <div className="flex-1"></div>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <Search className="h-5 w-5 text-gray-400" />
        </button>
        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <Maximize2 className="h-5 w-5 text-gray-400" />
        </button>
        <button className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <Bell className="h-5 w-5 text-gray-400" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-semibold">
            {userName.charAt(0)}
          </div>
          <span className="text-white font-medium">{userName}</span>
        </div>
        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <Settings className="h-5 w-5 text-teal-500" />
        </button>
      </div>
    </header>
  );
};

export default Header;

