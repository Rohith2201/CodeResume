import { Resume } from '../types/resume';

interface ScoreCategory {
  name: string;
  score: number;
  maxScore: number;
  feedback: string[];
}

export function scoreResume(resume: Resume): ScoreCategory[] {
  const scoring: ScoreCategory[] = [
    {
      name: 'Personal Information',
      score: 0,
      maxScore: 10,
      feedback: [],
    },
    {
      name: 'Experience',
      score: 0,
      maxScore: 30,
      feedback: [],
    },
    {
      name: 'Education',
      score: 0,
      maxScore: 15,
      feedback: [],
    },
    {
      name: 'Skills',
      score: 0,
      maxScore: 15,
      feedback: [],
    },
    {
      name: 'Projects',
      score: 0,
      maxScore: 15,
      feedback: [],
    },
    {
      name: 'Overall Impact',
      score: 0,
      maxScore: 15,
      feedback: [],
    },
  ];

  // Score Personal Information
  const personalScore = scoring[0];
  if (resume.personalInfo.fullName) personalScore.score += 2;
  if (resume.personalInfo.email) personalScore.score += 2;
  if (resume.personalInfo.phone) personalScore.score += 2;
  if (resume.personalInfo.summary) {
    personalScore.score += resume.personalInfo.summary.length > 100 ? 4 : 2;
  }
  if (!resume.personalInfo.summary) {
    personalScore.feedback.push('Add a professional summary to highlight your key strengths');
  }

  // Score Experience
  const expScore = scoring[1];
  resume.experience.forEach((exp, index) => {
    let points = 0;
    if (exp.company && exp.position) points += 3;
    if (exp.description && exp.description.length > 50) points += 3;
    if (exp.startDate && exp.endDate) points += 2;
    expScore.score = Math.min(expScore.maxScore, expScore.score + points);
  });
  if (resume.experience.length === 0) {
    expScore.feedback.push('Add relevant work experience to strengthen your resume');
  }

  // Score Education
  const eduScore = scoring[2];
  resume.education.forEach((edu) => {
    let points = 0;
    if (edu.school && edu.degree) points += 3;
    if (edu.fieldOfStudy) points += 2;
    if (edu.startDate && edu.endDate) points += 1;
    eduScore.score = Math.min(eduScore.maxScore, eduScore.score + points);
  });

  // Score Skills
  const skillScore = scoring[3];
  skillScore.score = Math.min(resume.skills.length * 3, skillScore.maxScore);
  if (resume.skills.length < 5) {
    skillScore.feedback.push('Add more relevant skills to showcase your expertise');
  }

  // Score Projects
  const projScore = scoring[4];
  resume.projects.forEach((proj) => {
    let points = 0;
    if (proj.title && proj.description) points += 2;
    if (proj.technologies.length > 0) points += 2;
    if (proj.url) points += 1;
    projScore.score = Math.min(projScore.maxScore, projScore.score + points);
  });

  // Score Overall Impact
  const overallScore = scoring[5];
  const hasLinks = resume.personalInfo.linkedin || resume.personalInfo.github;
  const hasCertifications = resume.certifications.length > 0;
  const hasAchievements = resume.achievements.length > 0;
  
  if (hasLinks) overallScore.score += 5;
  if (hasCertifications) overallScore.score += 5;
  if (hasAchievements) overallScore.score += 5;

  if (!hasLinks) {
    overallScore.feedback.push('Add professional profile links (LinkedIn, GitHub) to increase visibility');
  }

  return scoring;
}

export function getTotalScore(categories: ScoreCategory[]): number {
  return categories.reduce((total, category) => total + category.score, 0);
}

export function getMaxPossibleScore(categories: ScoreCategory[]): number {
  return categories.reduce((total, category) => total + category.maxScore, 0);
}