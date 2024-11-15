import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Book, Mic, LineChart, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  const navItems = [
    { to: '/', icon: Book, label: 'Dashboard' },
    { to: '/practice', icon: Mic, label: 'Practice' },
    { to: '/progress', icon: LineChart, label: 'Progress' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Book className="h-8 w-8 text-emerald-600" />
            <span className="text-xl font-semibold text-gray-800">AI Quran Memorization</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-emerald-600'
                      : 'text-gray-600 hover:text-emerald-500'
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </NavLink>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-red-500 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}