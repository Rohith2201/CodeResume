import React from 'react';

interface SkillsSectionProps {
  title: string;
  skills: string[];
  colorClass: string;
  bgClass: string;
}

export function SkillsSection({ title, skills, colorClass, bgClass }: SkillsSectionProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h4 className="font-semibold mb-4">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className={`px-3 py-1 ${bgClass} ${colorClass} rounded-full text-sm`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}