import React from 'react';
import { Calendar, Award, TrendingUp } from 'lucide-react';

export default function Progress() {
  const monthlyProgress = [
    { day: 1, score: 85 },
    { day: 2, score: 88 },
    { day: 3, score: 92 },
    { day: 4, score: 90 },
    { day: 5, score: 95 },
    { day: 6, score: 89 },
    { day: 7, score: 93 },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">Your Progress</h1>
        <p className="mt-2 text-gray-600">Track your memorization journey</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-emerald-500" />
            Weekly Activity
          </h2>
          <div className="h-48 flex items-end space-x-2">
            {monthlyProgress.map((day) => (
              <div
                key={day.day}
                className="flex-1 bg-emerald-100 rounded-t-lg relative group"
                style={{ height: `${day.score}%` }}
              >
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {day.score}%
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            {monthlyProgress.map((day) => (
              <span key={day.day}>Day {day.day}</span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Award className="h-5 w-5 mr-2 text-emerald-500" />
            Achievements
          </h2>
          <div className="space-y-4">
            {[
              { title: '7-Day Streak', description: 'Practice every day for a week', progress: 100 },
              { title: 'Perfect Recitation', description: 'Score 100% on any verse', progress: 75 },
              { title: 'Memorization Master', description: 'Memorize 10 verses', progress: 60 },
            ].map((achievement) => (
              <div key={achievement.title} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-800">{achievement.title}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                  <span className="text-emerald-600 font-semibold">{achievement.progress}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${achievement.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-emerald-500" />
          Detailed Statistics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Total Practice Time', value: '12.5 hours' },
            { label: 'Average Accuracy', value: '91%' },
            { label: 'Verses Mastered', value: '15' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}