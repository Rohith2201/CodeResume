import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import type { JobMatchAnalysis } from '../../utils/ats/jobMatcher';
import type { ParsedResume } from '../../utils/ats/resumeParser';

interface JobMatchResultsProps {
  analysis: JobMatchAnalysis;
  parsedResume: ParsedResume | null;
}

export function JobMatchResults({ analysis, parsedResume }: JobMatchResultsProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-100';
    return 'text-red-600 bg-red-50 border-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Resume Analysis Summary */}
      {parsedResume && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h4 className="font-semibold mb-4">Resume Analysis</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-700">Format Score</span>
                <span className="text-sm font-semibold text-blue-700">
                  {parsedResume.formatScore}%
                </span>
              </div>
              <div className="h-1 bg-blue-100 rounded-full">
                <div 
                  className="h-1 rounded-full bg-blue-600"
                  style={{ width: `${parsedResume.formatScore}%` }}
                />
              </div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-purple-700">Content Score</span>
                <span className="text-sm font-semibold text-purple-700">
                  {parsedResume.contentScore}%
                </span>
              </div>
              <div className="h-1 bg-purple-100 rounded-full">
                <div 
                  className="h-1 rounded-full bg-purple-600"
                  style={{ width: `${parsedResume.contentScore}%` }}
                />
              </div>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-indigo-700">Readability</span>
                <span className="text-sm font-semibold text-indigo-700">
                  {parsedResume.readabilityScore}%
                </span>
              </div>
              <div className="h-1 bg-indigo-100 rounded-full">
                <div 
                  className="h-1 rounded-full bg-indigo-600"
                  style={{ width: `${parsedResume.readabilityScore}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Match Score */}
      <div className={`rounded-lg p-6 border ${getScoreColor(analysis.matchScore)}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Job Match Score</h3>
          <span className="text-2xl font-bold">{analysis.matchScore}%</span>
        </div>
        <div className="h-2 bg-white/50 rounded-full mb-4">
          <div
            className="h-2 rounded-full bg-current transition-all"
            style={{ width: `${analysis.matchScore}%` }}
          />
        </div>
      </div>

      {/* Requirements Analysis */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h4 className="font-semibold mb-4">Requirements Analysis</h4>
        <div className="space-y-4">
          {analysis.requirements.map((req, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                req.matched
                  ? 'bg-green-50 border-green-100'
                  : req.type === 'required'
                  ? 'bg-red-50 border-red-100'
                  : 'bg-yellow-50 border-yellow-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {req.matched ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : req.type === 'required' ? (
                    <XCircle className="h-5 w-5 text-red-500" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{req.text}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        req.type === 'required'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {req.type === 'required' ? 'Required' : 'Preferred'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Missing Keywords */}
      {analysis.missingKeywords.length > 0 && (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h4 className="font-semibold mb-4">Missing Keywords</h4>
          <div className="flex flex-wrap gap-2">
            {analysis.missingKeywords.map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h4 className="font-semibold mb-4">Optimization Suggestions</h4>
        <div className="space-y-4">
          {analysis.suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                suggestion.priority === 'high'
                  ? 'bg-red-50 border-red-100'
                  : suggestion.priority === 'medium'
                  ? 'bg-yellow-50 border-yellow-100'
                  : 'bg-green-50 border-green-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {suggestion.priority === 'high' ? (
                    <XCircle className="h-5 w-5 text-red-500" />
                  ) : suggestion.priority === 'medium' ? (
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{suggestion.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}