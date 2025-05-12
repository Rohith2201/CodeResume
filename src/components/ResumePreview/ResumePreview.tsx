import React from 'react';
import { Resume } from '../../types/resume';
import { SocialLinks } from './SocialLinks';
import { ResumeSection } from './ResumeSection';
import { Download } from 'lucide-react';
import { exportToPdf } from '../../utils/export';

interface ResumePreviewProps {
  resume: Resume;
}

export function ResumePreview({ resume }: ResumePreviewProps) {
  const { personalInfo, education, experience, skills, achievements, certifications, projects, research } = resume;

  const handleDownloadPdf = async () => {
    await exportToPdf(resume);
  };

  return (
    <div className="max-w-[21cm] mx-auto">
      <div className="sticky top-24 z-10 mb-4 flex justify-end">
        <button
          onClick={handleDownloadPdf}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Download size={16} />
          Download PDF
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-8">
          {/* Header */}
          <div className="border-b-2 border-gray-200 pb-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{personalInfo.fullName || 'Your Name'}</h1>
            <SocialLinks personalInfo={personalInfo} />
            {personalInfo.summary && (
              <p className="mt-4 text-gray-700 leading-relaxed">{personalInfo.summary}</p>
            )}
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* Main Content - 2 columns */}
            <div className="col-span-2 space-y-8">
              {experience.length > 0 && (
                <ResumeSection title="Experience">
                  {experience.map((exp, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between items-baseline">
                        <div>
                          <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                          <p className="text-gray-600">{exp.company} • {exp.location}</p>
                        </div>
                        <div className="text-gray-500 text-sm whitespace-nowrap ml-2">
                          {exp.startDate} - {exp.endDate || 'Present'}
                        </div>
                      </div>
                      <p className="mt-2 text-gray-700 leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </ResumeSection>
              )}

              {projects.length > 0 && (
                <ResumeSection title="Projects">
                  {projects.map((project, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-semibold text-gray-900">
                          {project.title}
                          {project.url && (
                            <a href={project.url} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-600 hover:text-blue-700 text-sm">
                              View Project ↗
                            </a>
                          )}
                        </h3>
                        <div className="text-gray-500 text-sm whitespace-nowrap ml-2">
                          {project.startDate} - {project.endDate}
                        </div>
                      </div>
                      <p className="mt-2 text-gray-700 leading-relaxed">{project.description}</p>
                      {project.technologies.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </ResumeSection>
              )}

              {research.length > 0 && (
                <ResumeSection title="Research">
                  {research.map((item, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between items-baseline">
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.title}</h3>
                          <p className="text-gray-600">{item.institution}</p>
                        </div>
                        <div className="text-gray-500 text-sm whitespace-nowrap ml-2">{item.date}</div>
                      </div>
                      <p className="mt-2 text-gray-700 leading-relaxed">{item.description}</p>
                      {item.publication && (
                        <a href={item.publication} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-blue-600 hover:text-blue-700 text-sm">
                          View Publication ↗
                        </a>
                      )}
                    </div>
                  ))}
                </ResumeSection>
              )}
            </div>

            {/* Sidebar - 1 column */}
            <div className="space-y-8">
              {education.length > 0 && (
                <ResumeSection title="Education">
                  {education.map((edu, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="font-semibold text-gray-900">{edu.school}</h3>
                      <p className="text-gray-700">{edu.degree} in {edu.fieldOfStudy}</p>
                      <p className="text-gray-500 text-sm">
                        {edu.startDate} - {edu.endDate || 'Present'}
                      </p>
                      {edu.gpa && <p className="text-gray-600 text-sm mt-1">GPA: {edu.gpa}</p>}
                    </div>
                  ))}
                </ResumeSection>
              )}

              {skills.length > 0 && (
                <ResumeSection title="Skills">
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </ResumeSection>
              )}

              {certifications.length > 0 && (
                <ResumeSection title="Certifications">
                  {certifications.map((cert, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                      <p className="text-gray-600 text-sm">{cert.issuer}</p>
                      <p className="text-gray-500 text-sm">Issued: {cert.date}</p>
                      {cert.credentialId && (
                        <p className="text-gray-500 text-sm">ID: {cert.credentialId}</p>
                      )}
                    </div>
                  ))}
                </ResumeSection>
              )}

              {achievements.length > 0 && (
                <ResumeSection title="Achievements">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                      <p className="text-gray-700 text-sm leading-relaxed mt-1">{achievement.description}</p>
                      <p className="text-gray-500 text-sm mt-1">{achievement.date}</p>
                    </div>
                  ))}
                </ResumeSection>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}