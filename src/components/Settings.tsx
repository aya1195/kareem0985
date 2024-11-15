import React from 'react';
import { Bell, Moon, Volume2, Globe } from 'lucide-react';

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <p className="mt-2 text-gray-600">Customize your learning experience</p>
      </header>

      <div className="bg-white rounded-xl shadow-sm divide-y">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Bell className="h-5 w-5 mr-2 text-emerald-500" />
            Notifications
          </h2>
          <div className="space-y-4">
            {[
              { label: 'Daily Practice Reminder', description: 'Receive daily notifications for practice' },
              { label: 'Progress Updates', description: 'Weekly summary of your progress' },
              { label: 'Achievement Alerts', description: 'Get notified when you earn achievements' },
            ].map((setting) => (
              <div key={setting.label} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">{setting.label}</p>
                  <p className="text-sm text-gray-600">{setting.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Volume2 className="h-5 w-5 mr-2 text-emerald-500" />
            Audio Settings
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recitation Volume
              </label>
              <input
                type="range"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Feedback Sound Effects
              </label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md">
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Globe className="h-5 w-5 mr-2 text-emerald-500" />
            Language & Display
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interface Language
              </label>
              <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm rounded-md">
                <option>English</option>
                <option>Arabic</option>
                <option>Urdu</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Dark Mode</p>
                <p className="text-sm text-gray-600">Switch between light and dark themes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}