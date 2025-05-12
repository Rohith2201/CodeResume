import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { KeywordMatch } from '../../utils/ats/keywordMatcher';

interface KeywordMatchesSectionProps {
  matches: KeywordMatch[];
}

export function KeywordMatchesSection({ matches }: KeywordMatchesSectionProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h4 className="text-lg font-semibold mb-4">Keyword Analysis</h4>
      <div className="space-y-4">
        {matches.map((match, index) => (
          <div key={index} className="border-b border-gray-100 pb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {match.count > 1 ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                )}
                <span className="font-medium text-gray-900">{match.keyword}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  match.count > 1 ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                }`}>
                  Found {match.count} {match.count === 1 ? 'time' : 'times'}
                </span>
              </div>
            </div>
            {match.context[0] && (
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <p className="italic">"{match.context[0]}"</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}