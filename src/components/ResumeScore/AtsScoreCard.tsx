import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';
import { ParsedResume } from '../../utils/ats/resumeParser';
import { ScoreSection } from './ScoreSection';
import { SkillsSection } from './SkillsSection';
import { KeywordMatchesSection } from './KeywordMatchesSection';
import { RecommendationsSection } from './RecommendationsSection';

interface AtsScoreCardProps {
  parsedResume: ParsedResume;
}

export function AtsScoreCard({ parsedResume }: AtsScoreCardProps) {
  const {
    formatScore,
    contentScore,
    readabilityScore,
    technicalSkills,
    softSkills,
    recommendations,
    keywordMatches,
    jobTitleMatch,
    experienceMatch,
    educationMatch,
    overallCompatibility
  } = parsedResume;

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    if (score >= 60) return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    return <XCircle className="h-5 w-5 text-red-500" />;
  };

  const getScoreClass = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-100 text-green-700';
    if (score >= 60) return 'bg-yellow-50 border-yellow-100 text-yellow-700';
    return 'bg-red-50 border-red-100 text-red-700';
  };

  return (
    <div className="space-y-8">
      {/* Overall Score */}
      <div className={`rounded-lg p-6 border ${getScoreClass(overallCompatibility)}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {getScoreIcon(overallCompatibility)}
            <h3 className="text-lg font-semibold">Overall ATS Compatibility</h3>
          </div>
          <span className="text-2xl font-bold">{overallCompatibility}%</span>
        </div>
        <div className="h-2 bg-white/50 rounded-full mb-4">
          <div 
            className="h-2 rounded-full bg-current transition-all"
            style={{ width: `${overallCompatibility}%` }}
          />
        </div>
        <p className="text-sm">
          {overallCompatibility >= 80
            ? 'Your resume is well-optimized for ATS systems!'
            : overallCompatibility >= 60
            ? 'Your resume needs some improvements for better ATS compatibility.'
            : 'Your resume requires significant optimization for ATS systems.'}
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ScoreSection 
          title="Format Score" 
          score={formatScore}
          description="Measures the formatting and structure"
        />
        <ScoreSection 
          title="Content Score" 
          score={contentScore}
          description="Evaluates the quality and relevance of content"
        />
        <ScoreSection 
          title="Readability Score" 
          score={readabilityScore}
          description="Assesses how well ATS can parse your content"
        />
      </div>

      {/* Job Match Analysis */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h4 className="font-semibold mb-4">Job Match Analysis</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Job Title Match</span>
              <span className={`text-sm font-semibold ${jobTitleMatch >= 80 ? 'text-green-600' : 'text-yellow-600'}`}>
                {jobTitleMatch}%
              </span>
            </div>
            <div className="h-1 bg-gray-200 rounded-full">
              <div 
                className={`h-1 rounded-full ${jobTitleMatch >= 80 ? 'bg-green-500' : 'bg-yellow-500'}`}
                style={{ width: `${jobTitleMatch}%` }}
              />
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Experience Match</span>
              <span className={`text-sm font-semibold ${experienceMatch >= 80 ? 'text-green-600' : 'text-yellow-600'}`}>
                {experienceMatch}%
              </span>
            </div>
            <div className="h-1 bg-gray-200 rounded-full">
              <div 
                className={`h-1 rounded-full ${experienceMatch >= 80 ? 'bg-green-500' : 'bg-yellow-500'}`}
                style={{ width: `${experienceMatch}%` }}
              />
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Education Match</span>
              <span className={`text-sm font-semibold ${educationMatch >= 80 ? 'text-green-600' : 'text-yellow-600'}`}>
                {educationMatch}%
              </span>
            </div>
            <div className="h-1 bg-gray-200 rounded-full">
              <div 
                className={`h-1 rounded-full ${educationMatch >= 80 ? 'bg-green-500' : 'bg-yellow-500'}`}
                style={{ width: `${educationMatch}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Skills Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SkillsSection
          title="Technical Skills"
          skills={technicalSkills}
          colorClass="text-blue-700"
          bgClass="bg-blue-50"
        />
        <SkillsSection
          title="Soft Skills"
          skills={softSkills}
          colorClass="text-green-700"
          bgClass="bg-green-50"
        />
      </div>

      {/* Keyword Matches */}
      <KeywordMatchesSection matches={keywordMatches} />

      {/* Recommendations */}
      <RecommendationsSection recommendations={recommendations} />
    </div>
  );
}