import React from 'react';
import { CircleSlash, CheckCircle2, AlertCircle } from 'lucide-react';

interface ScoreCardProps {
  name: string;
  score: number;
  maxScore: number;
  feedback: string[];
}

export function ScoreCard({ name, score, maxScore, feedback }: ScoreCardProps) {
  const percentage = (score / maxScore) * 100;
  const getScoreColor = () => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getIcon = () => {
    if (percentage >= 80) return <CheckCircle2 className="text-green-600" size={20} />;
    if (percentage >= 50) return <AlertCircle className="text-yellow-600" size={20} />;
    return <CircleSlash className="text-red-600" size={20} />;
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {getIcon()}
          <h3 className="font-semibold text-gray-900">{name}</h3>
        </div>
        <div className={`font-bold ${getScoreColor()}`}>
          {score}/{maxScore}
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className={`h-2 rounded-full ${
            percentage >= 80 ? 'bg-green-600' : percentage >= 50 ? 'bg-yellow-600' : 'bg-red-600'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {feedback.length > 0 && (
        <ul className="text-sm text-gray-600 space-y-1">
          {feedback.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}