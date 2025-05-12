export interface JobRequirement {
  type: 'required' | 'preferred';
  text: string;
  matched: boolean;
}

export interface JobMatchAnalysis {
  matchScore: number;
  keywordMatches: {
    keyword: string;
    found: boolean;
    context?: string;
  }[];
  requirements: JobRequirement[];
  missingKeywords: string[];
  suggestions: {
    text: string;
    priority: 'high' | 'medium' | 'low';
  }[];
}

function extractRequirements(text: string): JobRequirement[] {
  const requirements: JobRequirement[] = [];
  
  // Look for common requirement patterns
  const lines = text.split('\n');
  
  lines.forEach(line => {
    line = line.trim().toLowerCase();
    
    if (line.includes('required') || line.includes('must have') || line.includes('essential')) {
      requirements.push({
        type: 'required',
        text: line,
        matched: false
      });
    } else if (line.includes('preferred') || line.includes('nice to have') || line.includes('desirable')) {
      requirements.push({
        type: 'preferred',
        text: line,
        matched: false
      });
    }
  });

  return requirements;
}

function extractKeywords(text: string): string[] {
  // Common job-related keywords
  const commonKeywords = [
    'experience', 'degree', 'bachelor', 'master', 'phd',
    'years', 'skills', 'knowledge', 'proficient', 'expert',
    'team', 'leadership', 'management', 'communication',
    'development', 'design', 'analysis', 'testing',
    'agile', 'scrum', 'project', 'deadline', 'budget'
  ];

  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  return [...new Set(words.filter(word => 
    commonKeywords.includes(word) || 
    word.length > 5 // Capture longer words as potential technical terms
  ))];
}

function generateSuggestions(analysis: Partial<JobMatchAnalysis>): {
  text: string;
  priority: 'high' | 'medium' | 'low';
}[] {
  const suggestions = [];

  if (analysis.matchScore! < 60) {
    suggestions.push({
      text: 'Your resume needs significant alignment with the job requirements',
      priority: 'high'
    });
  }

  if (analysis.missingKeywords!.length > 5) {
    suggestions.push({
      text: `Add these missing keywords: ${analysis.missingKeywords!.slice(0, 5).join(', ')}`,
      priority: 'high'
    });
  }

  const unmetRequirements = analysis.requirements!.filter(req => 
    req.type === 'required' && !req.matched
  );

  if (unmetRequirements.length > 0) {
    suggestions.push({
      text: 'Address these unmet requirements in your resume',
      priority: 'high'
    });
  }

  return suggestions;
}

export function analyzeJobMatch(jobDescription: string): JobMatchAnalysis {
  const keywords = extractKeywords(jobDescription);
  const requirements = extractRequirements(jobDescription);
  
  // Simulate matching process (replace with actual resume comparison)
  const keywordMatches = keywords.map(keyword => ({
    keyword,
    found: Math.random() > 0.3,
    context: Math.random() > 0.5 ? 'Found in experience section' : undefined
  }));

  const missingKeywords = keywordMatches
    .filter(match => !match.found)
    .map(match => match.keyword);

  const matchScore = Math.round(
    (keywordMatches.filter(match => match.found).length / keywords.length) * 100
  );

  const analysis: JobMatchAnalysis = {
    matchScore,
    keywordMatches,
    requirements,
    missingKeywords,
    suggestions: []
  };

  analysis.suggestions = generateSuggestions(analysis);

  return analysis;
}