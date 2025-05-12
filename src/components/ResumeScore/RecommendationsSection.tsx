import React from 'react';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

interface RecommendationsSectionProps {
  recommendations: {
    text: string;
    priority: 'high' | 'medium' | 'low';
    category: 'format' | 'content' | 'keywords';
  }[];
}

export function RecommendationsSection({ recommendations }: RecommendationsSectionProps) {
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <XCircle className="text-red-500" size={16} />;
      case 'medium':
        return <AlertCircle className="text-yellow-500" size={16} />;
      case 'low':
        return <CheckCircle2 className="text-green-500" size={16} />;
      default:
        return null;
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 text-red-700 border-red-100';
      case 'medium':
        return 'bg-yellow-50 text-yellow-700 border-yellow-100';
      case 'low':
        return 'bg-green-50 text-green-700 border-green-100';
      default:
        return '';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'format':
        return 'Formatting';
      case 'content':
        return 'Content';
      case 'keywords':
        return 'Keywords';
      default:
        return category;
    }
  };

  if (recommendations.length === 0) return null;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h4 className="text-lg font-semibold mb-4">Optimization Recommendations</h4>
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border ${getPriorityClass(rec.priority)}`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">{getPriorityIcon(rec.priority)}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{rec.text}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-white/50">
                    {getCategoryLabel(rec.category)}
                  </span>
                </div>
                <p className="text-sm opacity-75">
                  {rec.priority === 'high'
                    ? 'Critical issue that needs immediate attention'
                    : rec.priority === 'medium'
                    ? 'Important improvement that should be addressed'
                    : 'Minor enhancement that could be beneficial'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}