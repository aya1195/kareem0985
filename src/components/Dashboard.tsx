import React from 'react';
import { Award, BookOpen, Clock, Target } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { icon: Clock, label: 'Practice Time', value: '2.5 hours' },
    { icon: BookOpen, label: 'Verses Memorized', value: '127' },
    { icon: Target, label: 'Accuracy', value: '92%' },
    { icon: Award, label: 'Streak', value: '7 days' },
  ];

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back, Hafiz</h1>
        <p className="mt-2 text-gray-600">Continue your journey of memorization</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-white rounded-xl shadow-sm p-6 transition-transform hover:scale-105">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-emerald-100 rounded-lg">
                <Icon className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{label}</p>
                <p className="text-xl font-semibold text-gray-800">{value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { surah: 'Al-Fatiha', time: '2 hours ago', score: 95 },
              { surah: 'Al-Baqarah 1-5', time: 'Yesterday', score: 88 },
              { surah: 'Al-Ikhlas', time: '2 days ago', score: 100 },
            ].map((activity) => (
              <div key={activity.time} className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-800">{activity.surah}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-emerald-600 font-semibold">{activity.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Next Goals</h2>
          <div className="space-y-4">
            {[
              { goal: 'Complete Al-Baqarah 6-10', progress: 60 },
              { goal: 'Daily Practice Streak', progress: 70 },
              { goal: 'Improve Tajweed Score', progress: 85 },
            ].map((goal) => (
              <div key={goal.goal} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">{goal.goal}</span>
                  <span className="text-gray-600">{goal.progress}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}