import React from 'react';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';

interface FeedbackProps {
  score: number;
  feedback: string;
  details: {
    pronunciation: number;
    fluency: number;
    tajweed: number;
  };
  corrections: Array<{
    word: string;
    correction: string;
    rule: string;
  }>;
}

export default function RecitationFeedback({
  score,
  feedback,
  details,
  corrections,
}: FeedbackProps) {
  const getScoreColor = (value: number) => {
    if (value >= 90) return 'text-emerald-500';
    if (value >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-50">
          <span className={`text-3xl font-bold ${getScoreColor(score)}`}>
            {score}%
          </span>
        </div>
        <p className="mt-2 text-gray-700">{feedback}</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {Object.entries(details).map(([key, value]) => (
          <div key={key} className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 capitalize">{key}</p>
            <p className={`text-xl font-bold ${getScoreColor(value)}`}>
              {value}%
            </p>
          </div>
        ))}
      </div>

      {corrections.length > 0 && (
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Suggested Improvements
          </h3>
          <div className="space-y-3">
            {corrections.map((correction, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 bg-gray-50 p-3 rounded-lg"
              >
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="text-gray-800">
                    <span className="font-arabic">{correction.word}</span>
                    {' → '}
                    <span className="font-arabic">{correction.correction}</span>
                  </p>
                  <p className="text-sm text-gray-600">{correction.rule}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}