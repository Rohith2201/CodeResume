import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Code2, Award } from 'lucide-react';
import { PersonalInfo } from '../../types/resume';

interface SocialLinksProps {
  personalInfo: PersonalInfo;
}

export function SocialLinks({ personalInfo }: SocialLinksProps) {
  const getDisplayUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname + urlObj.pathname;
    } catch {
      return url;
    }
  };

  return (
    <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-600">
      {personalInfo.email && (
        <div className="flex items-center gap-1">
          <Mail size={14} />
          <span>{personalInfo.email}</span>
        </div>
      )}
      {personalInfo.phone && (
        <div className="flex items-center gap-1">
          <Phone size={14} />
          <span>{personalInfo.phone}</span>
        </div>
      )}
      {personalInfo.location && (
        <div className="flex items-center gap-1">
          <MapPin size={14} />
          <span>{personalInfo.location}</span>
        </div>
      )}
      {personalInfo.linkedin && (
        <div className="flex items-center gap-1">
          <Linkedin size={14} />
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {getDisplayUrl(personalInfo.linkedin)}
          </a>
        </div>
      )}
      {personalInfo.github && (
        <div className="flex items-center gap-1">
          <Github size={14} />
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {getDisplayUrl(personalInfo.github)}
          </a>
        </div>
      )}
      {personalInfo.codeforces && (
        <div className="flex items-center gap-1">
          <Code2 size={14} />
          <a href={personalInfo.codeforces} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {getDisplayUrl(personalInfo.codeforces)}
          </a>
        </div>
      )}
      {personalInfo.hackerrank && (
        <div className="flex items-center gap-1">
          <Award size={14} />
          <a href={personalInfo.hackerrank} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {getDisplayUrl(personalInfo.hackerrank)}
          </a>
        </div>
      )}
      {personalInfo.website && (
        <div className="flex items-center gap-1">
          <Globe size={14} />
          <a href={personalInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {getDisplayUrl(personalInfo.website)}
          </a>
        </div>
      )}
    </div>
  );
}