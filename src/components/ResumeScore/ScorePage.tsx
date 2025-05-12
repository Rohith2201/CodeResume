import React, { useState } from 'react';
import { Award, Sparkles, AlertCircle, ScanSearch } from 'lucide-react';
import { Resume } from '../../types/resume';
import { PdfUploader } from './PdfUploader';
import { AtsScoreCard } from './AtsScoreCard';
import { JobScanner } from './JobScanner';
import { JobMatchResults } from './JobMatchResults';
import { parseResume } from '../../utils/ats/resumeParser';
import type { ParsedResume } from '../../utils/ats/resumeParser';
import type { JobMatchAnalysis } from '../../utils/ats/jobMatcher';

interface ScorePageProps {
  resume: Resume;
}

export function ScorePage({ resume }: ScorePageProps) {
  const [error, setError] = useState<string | null>(null);
  const [parsedResume, setParsedResume] = useState<ParsedResume | null>(null);
  const [jobAnalysis, setJobAnalysis] = useState<JobMatchAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState<'ats' | 'job'>('ats');

  const handlePdfAnalyzed = (text: string) => {
    try {
      const parsed = parseResume(text);
      setParsedResume(parsed);
      setError(null);
    } catch (err) {
      setError('Failed to analyze the resume. Please try again.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('ats')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'ats'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Sparkles className="h-5 w-5" />
          ATS Score
        </button>
        <button
          onClick={() => setActiveTab('job')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            activeTab === 'job'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <ScanSearch className="h-5 w-5" />
          Job Scanner
        </button>
      </div>

      {activeTab === 'ats' ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-600 text-white p-3 rounded-lg">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ATS Resume Analysis</h1>
              <p className="text-gray-600 mt-1">
                Get instant feedback on your resume's ATS compatibility and optimization suggestions
              </p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-sm text-blue-700">
                <h4 className="font-semibold mb-1">Why ATS Optimization Matters</h4>
                <p>
                  Over 90% of large companies use Applicant Tracking Systems (ATS) to screen resumes. 
                  Our analysis helps ensure your resume passes these systems and reaches human recruiters.
                </p>
              </div>
            </div>
          </div>

          <PdfUploader 
            onPdfAnalyzed={handlePdfAnalyzed}
            onError={setError}
          />

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-100">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}

          {parsedResume && <AtsScoreCard parsedResume={parsedResume} />}
        </div>
      ) : (
        <>
          <JobScanner onAnalysis={setJobAnalysis} />
          {jobAnalysis && <JobMatchResults analysis={jobAnalysis} />}
        </>
      )}
    </div>
  );
}