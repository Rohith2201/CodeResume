import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

interface ScoreSectionProps {
  title: string;
  score: number;
  description: string;
}

export function ScoreSection({ title, score, description }: ScoreSectionProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-100';
    if (score >= 60) return 'bg-yellow-50 border-yellow-100';
    return 'bg-red-50 border-red-100';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    if (score >= 60) return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    return <XCircle className="h-5 w-5 text-red-500" />;
  };

  return (
    <div className={`rounded-lg p-4 border ${getScoreBackground(score)}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {getScoreIcon(score)}
          <h4 className="font-semibold">{title}</h4>
        </div>
        <span className={`text-lg font-bold ${getScoreColor(score)}`}>
          {score}%
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <div className="w-full bg-white/50 rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full ${score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}