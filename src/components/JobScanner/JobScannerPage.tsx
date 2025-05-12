import React, { useState, useEffect } from 'react';
import { Search, History, Building2, AlertCircle, Upload } from 'lucide-react';
import { JobScanner } from '../ResumeScore/JobScanner';
import { JobMatchResults } from '../ResumeScore/JobMatchResults';
import { JobScanHistory } from './JobScanHistory';
import { PdfUploader } from '../ResumeScore/PdfUploader';
import { parseResume } from '../../utils/ats/resumeParser';
import type { JobMatchAnalysis } from '../../utils/ats/jobMatcher';
import type { JobScan } from '../../types/jobScan';
import type { ParsedResume } from '../../utils/ats/resumeParser';

export function JobScannerPage() {
  const [jobAnalysis, setJobAnalysis] = useState<JobMatchAnalysis | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [scanHistory, setScanHistory] = useState<JobScan[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [parsedResume, setParsedResume] = useState<ParsedResume | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load scan history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('jobScanHistory');
    if (savedHistory) {
      setScanHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleSaveScan = (analysis: JobMatchAnalysis, jobDescription: string) => {
    if (!companyName.trim() || !jobTitle.trim()) {
      alert('Please enter company name and job title');
      return;
    }

    const newScan: JobScan = {
      id: Date.now().toString(),
      companyName,
      jobTitle,
      dateScanned: new Date().toISOString(),
      jobDescription,
      matchScore: analysis.matchScore,
      status: 'saved'
    };

    const updatedHistory = [newScan, ...scanHistory];
    setScanHistory(updatedHistory);
    localStorage.setItem('jobScanHistory', JSON.stringify(updatedHistory));

    // Reset form
    setCompanyName('');
    setJobTitle('');
  };

  const handleDeleteScan = (id: string) => {
    const updatedHistory = scanHistory.filter(scan => scan.id !== id);
    setScanHistory(updatedHistory);
    localStorage.setItem('jobScanHistory', JSON.stringify(updatedHistory));
  };

  const handleUpdateStatus = (id: string, status: 'applied' | 'saved' | 'archived') => {
    const updatedHistory = scanHistory.map(scan =>
      scan.id === id ? { ...scan, status } : scan
    );
    setScanHistory(updatedHistory);
    localStorage.setItem('jobScanHistory', JSON.stringify(updatedHistory));
  };

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
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-purple-600 text-white p-3 rounded-lg">
            <Search className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Job Scanner</h1>
            <p className="text-gray-600">Analyze job descriptions and track your applications</p>
          </div>
        </div>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <History className="h-5 w-5" />
          {showHistory ? 'New Scan' : 'View History'}
        </button>
      </div>

      {showHistory ? (
        <JobScanHistory
          scans={scanHistory}
          onDelete={handleDeleteScan}
          onUpdateStatus={handleUpdateStatus}
        />
      ) : (
        <>
          {/* Resume Upload Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Upload className="h-5 w-5 text-purple-600" />
              <h2 className="text-lg font-semibold">Upload Your Resume</h2>
            </div>
            <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 mb-6">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-purple-600 flex-shrink-0" />
                <p className="text-sm text-purple-700">
                  Upload your resume first to get the most accurate job match analysis. We'll analyze your resume's content and compare it with the job requirements.
                </p>
              </div>
            </div>
            <PdfUploader 
              onPdfAnalyzed={handlePdfAnalyzed}
              onError={setError}
            />
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg mt-4 border border-red-100">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  <span className="font-medium">{error}</span>
                </div>
              </div>
            )}
          </div>

          {/* Company Info Form */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="h-5 w-5 text-gray-400" />
              <h2 className="text-lg font-semibold">Company Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter company name"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Enter job title"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Job Scanner */}
          <JobScanner
            onAnalysis={(analysis) => {
              setJobAnalysis(analysis);
              handleSaveScan(analysis, ''); // Add actual job description here
            }}
          />

          {/* Analysis Results */}
          {jobAnalysis && <JobMatchResults analysis={jobAnalysis} parsedResume={parsedResume} />}
        </>
      )}
    </div>
  );
}