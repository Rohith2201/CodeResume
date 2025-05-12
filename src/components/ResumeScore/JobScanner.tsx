import React, { useState } from 'react';
import { Search, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { analyzeJobMatch } from '../../utils/ats/jobMatcher';
import type { JobMatchAnalysis } from '../../utils/ats/jobMatcher';

interface JobScannerProps {
  onAnalysis: (analysis: JobMatchAnalysis) => void;
}

export function JobScanner({ onAnalysis }: JobScannerProps) {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    try {
      const analysis = analyzeJobMatch(jobDescription);
      onAnalysis(analysis);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-purple-600 text-white p-3 rounded-lg">
            <Search className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Job Description Scanner</h2>
            <p className="text-gray-600 mt-1">
              Analyze how well your resume matches the job requirements
            </p>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-sm text-purple-700">
              <h4 className="font-semibold mb-1">Maximize Your Match Rate</h4>
              <p>
                Paste the job description below to analyze keyword matches, required qualifications,
                and get tailored suggestions for optimizing your resume.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            className="w-full h-64 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 resize-none"
          />
          <button
            onClick={handleAnalyze}
            disabled={!jobDescription.trim() || isAnalyzing}
            className={`w-full py-3 rounded-lg font-medium text-white 
              ${jobDescription.trim() && !isAnalyzing
                ? 'bg-purple-600 hover:bg-purple-700'
                : 'bg-gray-300 cursor-not-allowed'
              } transition-colors`}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Job Match'}
          </button>
        </div>
      </div>
    </div>
  );
}