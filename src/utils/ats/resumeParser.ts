import { KeywordMatch, findKeywordMatches } from './keywordMatcher';

export interface ParsedResume {
  keywordMatches: KeywordMatch[];
  formatScore: number;
  contentScore: number;
  readabilityScore: number;
  technicalSkills: string[];
  softSkills: string[];
  experienceYears: number;
  educationLevel: string;
  jobTitleMatch: number;
  experienceMatch: number;
  educationMatch: number;
  overallCompatibility: number;
  recommendations: {
    text: string;
    priority: 'high' | 'medium' | 'low';
    category: 'format' | 'content' | 'keywords';
  }[];
}

const TECHNICAL_KEYWORDS = [
  'javascript', 'python', 'java', 'react', 'angular', 'vue', 'node.js',
  'aws', 'docker', 'kubernetes', 'sql', 'nosql', 'mongodb', 'typescript',
  'git', 'ci/cd', 'agile', 'scrum', 'rest api', 'graphql', 'html', 'css',
  'devops', 'cloud', 'microservices', 'testing', 'security'
];

const SOFT_SKILLS = [
  'leadership', 'communication', 'teamwork', 'problem solving',
  'analytical', 'project management', 'time management', 'collaboration',
  'adaptability', 'creativity', 'critical thinking', 'attention to detail',
  'organization', 'interpersonal', 'decision making'
];

function calculateFormatScore(text: string): number {
  let score = 100;
  
  if (text.includes('  ')) score -= 5;
  if (text.match(/[A-Z]{4,}/g)) score -= 5;
  if (text.match(/[^\S\r\n]{2,}/g)) score -= 5;
  if (!text.match(/^[\w\s-]+:/gm)) score -= 10;
  if (text.length > 5000) score -= 10;
  if (text.match(/[^\x00-\x7F]/g)) score -= 5;
  
  return Math.max(0, score);
}

function calculateReadabilityScore(text: string): number {
  const words = text.split(/\s+/).length;
  const sentences = text.split(/[.!?]+/).length;
  const avgWordsPerSentence = words / sentences;
  
  let score = 100;
  
  if (avgWordsPerSentence > 25) score -= 20;
  if (avgWordsPerSentence < 5) score -= 10;
  if (words < 100) score -= 20;
  if (sentences < 5) score -= 15;
  
  return Math.max(0, score);
}

function calculateContentScore(text: string, technicalSkills: string[], softSkills: string[]): number {
  let score = 100;
  
  if (technicalSkills.length < 5) score -= 20;
  if (softSkills.length < 3) score -= 15;
  if (!text.match(/\d{4}/g)) score -= 10;
  if (!text.match(/(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i)) score -= 10;
  
  return Math.max(0, score);
}

function generateRecommendations(parsed: Partial<ParsedResume>): {
  text: string;
  priority: 'high' | 'medium' | 'low';
  category: 'format' | 'content' | 'keywords';
}[] {
  const recommendations = [];

  if (parsed.formatScore! < 70) {
    recommendations.push({
      text: 'Improve resume formatting for better ATS readability',
      priority: 'high',
      category: 'format'
    });
  }

  if (parsed.technicalSkills!.length < 5) {
    recommendations.push({
      text: 'Add more relevant technical skills',
      priority: 'high',
      category: 'keywords'
    });
  }

  if (parsed.softSkills!.length < 3) {
    recommendations.push({
      text: 'Include more soft skills to show well-roundedness',
      priority: 'medium',
      category: 'content'
    });
  }

  if (parsed.readabilityScore! < 70) {
    recommendations.push({
      text: 'Optimize sentence structure and length',
      priority: 'medium',
      category: 'content'
    });
  }

  return recommendations;
}

export function parseResume(text: string): ParsedResume {
  const technicalMatches = findKeywordMatches(text, TECHNICAL_KEYWORDS);
  const softSkillMatches = findKeywordMatches(text, SOFT_SKILLS);
  
  const technicalSkills = technicalMatches.map(match => match.keyword);
  const softSkills = softSkillMatches.map(match => match.keyword);
  
  const formatScore = calculateFormatScore(text);
  const readabilityScore = calculateReadabilityScore(text);
  const contentScore = calculateContentScore(text, technicalSkills, softSkills);
  
  const parsed: ParsedResume = {
    keywordMatches: [...technicalMatches, ...softSkillMatches],
    formatScore,
    contentScore,
    readabilityScore,
    technicalSkills,
    softSkills,
    experienceYears: 0,
    educationLevel: 'Unknown',
    jobTitleMatch: Math.round(Math.random() * 20 + 80), // Simulated scores
    experienceMatch: Math.round(Math.random() * 20 + 75),
    educationMatch: Math.round(Math.random() * 20 + 70),
    overallCompatibility: Math.round((formatScore + contentScore + readabilityScore) / 3),
    recommendations: []
  };
  
  parsed.recommendations = generateRecommendations(parsed);
  
  return parsed;
}