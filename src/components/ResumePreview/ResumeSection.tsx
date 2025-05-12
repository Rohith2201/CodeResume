import React from 'react';

interface ResumeSectionProps {
  title: string;
  children: React.ReactNode;
}

export function ResumeSection({ title, children }: ResumeSectionProps) {
  return (
    <section className="mb-4">
      <h2 className="text-lg font-semibold mb-2 text-gray-900 border-b border-gray-200 pb-1">
        {title}
      </h2>
      <div className="space-y-3">
        {children}
      </div>
    </section>
  );
}