import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  Calendar, 
  ClipboardList, 
  Clock,
  Briefcase,
  Code
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/department', label: 'Department', icon: Building2 },
    { path: '/staff', label: 'Staff', icon: Users },
    { path: '/leave', label: 'Leave', icon: Calendar },
    { path: '/task-manager', label: 'Task Manager', icon: ClipboardList },
    { path: '/attendance', label: 'My Attendance', icon: Clock },
    { path: '/portfolio', label: 'Portfolio', icon: Briefcase },
    { path: '/codelytical', label: 'CodeLytical', icon: Code },
  ];

  return (
    <div className="w-64 bg-[#1e293b] text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-lg font-semibold">Navigation</h2>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;

