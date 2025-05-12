import React, { useState, useEffect } from 'react';
import { FileText, Download, Eye, Edit3, Award, Sparkles, Code, FileDown, Search } from 'lucide-react';
import { PersonalInfoForm } from './components/ResumeForm/PersonalInfoForm';
import { ExperienceForm } from './components/ResumeForm/ExperienceForm';
import { EducationForm } from './components/ResumeForm/EducationForm';
import { SkillsForm } from './components/ResumeForm/SkillsForm';
import { AchievementsForm } from './components/ResumeForm/AchievementsForm';
import { CertificationsForm } from './components/ResumeForm/CertificationsForm';
import { ProjectsForm } from './components/ResumeForm/ProjectsForm';
import { ResearchForm } from './components/ResumeForm/ResearchForm';
import { ResumePreview } from './components/ResumePreview/ResumePreview';
import { ScorePage } from './components/ResumeScore/ScorePage';
import { JobScannerPage } from './components/JobScanner/JobScannerPage';
import { Resume } from './types/resume';
import { exportToPdf, exportToWord } from './utils/export';
import { PrivacyPolicy } from './components/Legal/PrivacyPolicy';
import { TermsConditions } from './components/Legal/TermsConditions';

const STORAGE_KEY = 'coderesume_data';

const initialResume: Resume = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    linkedin: '',
    github: '',
    website: '',
    codeforces: '',
    hackerrank: ''
  },
  education: [],
  experience: [],
  skills: [],
  achievements: [],
  certifications: [],
  projects: [],
  research: []
};

export default function App() {
  const [resume, setResume] = useState<Resume>(() => {
    // Load saved resume data from localStorage
    const savedResume = localStorage.getItem(STORAGE_KEY);
    return savedResume ? JSON.parse(savedResume) : initialResume;
  });
  const [currentView, setCurrentView] = useState<'edit' | 'preview' | 'score' | 'privacy' | 'terms' | 'jobScanner'>('edit');
  const [activeSection, setActiveSection] = useState('personal');
  const [showExportMenu, setShowExportMenu] = useState(false);

  // Save resume data whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resume));
  }, [resume]);

  const handleExport = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(resume, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `${resume.personalInfo.fullName.toLowerCase().replace(/\s+/g, '-')}-resume.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleExportPdf = async () => {
    await exportToPdf(resume);
    setShowExportMenu(false);
  };

  const handleExportWord = async () => {
    await exportToWord(resume);
    setShowExportMenu(false);
  };

  const sections = [
    { id: 'personal', name: 'Personal Info', icon: FileText },
    { id: 'experience', name: 'Experience', icon: Sparkles },
    { id: 'education', name: 'Education', icon: Award },
    { id: 'skills', name: 'Skills', icon: Sparkles },
    { id: 'projects', name: 'Projects', icon: FileText },
    { id: 'achievements', name: 'Achievements', icon: Award },
    { id: 'certifications', name: 'Certifications', icon: Award },
    { id: 'research', name: 'Research', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Code className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CodeResume</h1>
                <p className="text-sm text-gray-500">Powered by Code365</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setCurrentView('edit')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentView === 'edit'
                    ? 'bg-blue-50 text-blue-700 ring-2 ring-blue-600 ring-opacity-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Edit3 size={16} />
                Editor
              </button>
              <button
                onClick={() => setCurrentView('preview')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentView === 'preview'
                    ? 'bg-blue-50 text-blue-700 ring-2 ring-blue-600 ring-opacity-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Eye size={16} />
                Preview
              </button>
              <button
                onClick={() => setCurrentView('score')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentView === 'score'
                    ? 'bg-blue-50 text-blue-700 ring-2 ring-blue-600 ring-opacity-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Award size={16} />
                ATS Score
              </button>
              <button
                onClick={() => setCurrentView('jobScanner')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentView === 'jobScanner'
                    ? 'bg-purple-50 text-purple-700 ring-2 ring-purple-600 ring-opacity-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Search size={16} />
                Job Scanner
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <Download size={16} />
                  Export
                </button>
                
                {showExportMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                    <button
                      onClick={handleExportPdf}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <FileDown size={16} />
                      Export as PDF
                    </button>
                    <button
                      onClick={handleExportWord}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <FileText size={16} />
                      Export as Word
                    </button>
                    <button
                      onClick={handleExport}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Download size={16} />
                      Export as JSON
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'preview' && <ResumePreview resume={resume} />}
        {currentView === 'score' && <ScorePage resume={resume} />}
        {currentView === 'jobScanner' && <JobScannerPage />}
        {currentView === 'privacy' && <PrivacyPolicy />}
        {currentView === 'terms' && <TermsConditions />}
        {currentView === 'edit' && (
          <div className="grid grid-cols-12 gap-8">
            {/* Sidebar Navigation */}
            <div className="col-span-3">
              <nav className="space-y-1 sticky top-24">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  {sections.map((section, index) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors ${
                        activeSection === section.id
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      } ${index !== 0 ? 'border-t border-gray-100' : ''}`}
                    >
                      <section.icon size={18} />
                      <span className="font-medium">{section.name}</span>
                    </button>
                  ))}
                </div>
              </nav>
            </div>

            {/* Form Sections */}
            <div className="col-span-9 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                {activeSection === 'personal' && (
                  <PersonalInfoForm
                    personalInfo={resume.personalInfo}
                    onChange={(personalInfo) => setResume({ ...resume, personalInfo })}
                  />
                )}

                {activeSection === 'experience' && (
                  <ExperienceForm
                    experiences={resume.experience}
                    onChange={(experience) => setResume({ ...resume, experience })}
                  />
                )}

                {activeSection === 'education' && (
                  <EducationForm
                    education={resume.education}
                    onChange={(education) => setResume({ ...resume, education })}
                  />
                )}

                {activeSection === 'skills' && (
                  <SkillsForm
                    skills={resume.skills}
                    onChange={(skills) => setResume({ ...resume, skills })}
                  />
                )}

                {activeSection === 'projects' && (
                  <ProjectsForm
                    projects={resume.projects}
                    onChange={(projects) => setResume({ ...resume, projects })}
                  />
                )}

                {activeSection === 'achievements' && (
                  <AchievementsForm
                    achievements={resume.achievements}
                    onChange={(achievements) => setResume({ ...resume, achievements })}
                  />
                )}

                {activeSection === 'certifications' && (
                  <CertificationsForm
                    certifications={resume.certifications}
                    onChange={(certifications) => setResume({ ...resume, certifications })}
                  />
                )}

                {activeSection === 'research' && (
                  <ResearchForm
                    research={resume.research}
                    onChange={(research) => setResume({ ...resume, research })}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">About CodeResume</h3>
              <p className="text-sm text-gray-600">
                Create professional, ATS-optimized resumes with our intelligent resume builder.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setCurrentView('privacy')}
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentView('terms')}
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Terms & Conditions
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Connect</h3>
              <div className="flex space-x-4">
                <a href="https://x.com/MetacodeA" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="https://github.com/CODEMETAPHOR" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 text-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} CodeResume. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}