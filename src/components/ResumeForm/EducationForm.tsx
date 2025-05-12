import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Education } from '../../types/resume';

interface EducationFormProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

export function EducationForm({ education, onChange }: EducationFormProps) {
  const handleAdd = () => {
    onChange([
      ...education,
      {
        school: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ]);
  };

  const handleRemove = (index: number) => {
    onChange(education.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof Education, value: string) => {
    const updatedEducation = education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    onChange(updatedEducation);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Education</h3>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus size={16} /> Add Education
        </button>
      </div>
      
      {education.map((edu, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-4">
          <div className="flex justify-end">
            <button
              onClick={() => handleRemove(index)}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={edu.school}
              onChange={(e) => handleChange(index, 'school', e.target.value)}
              placeholder="School"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={edu.degree}
              onChange={(e) => handleChange(index, 'degree', e.target.value)}
              placeholder="Degree"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={edu.fieldOfStudy}
              onChange={(e) => handleChange(index, 'fieldOfStudy', e.target.value)}
              placeholder="Field of Study"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="month"
                value={edu.startDate}
                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                placeholder="Start Date"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="month"
                value={edu.endDate}
                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                placeholder="End Date"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <textarea
            value={edu.description}
            onChange={(e) => handleChange(index, 'description', e.target.value)}
            placeholder="Description"
            rows={3}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}
    </div>
  );
}