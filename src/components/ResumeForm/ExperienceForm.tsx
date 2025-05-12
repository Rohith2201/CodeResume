import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Experience } from '../../types/resume';

interface ExperienceFormProps {
  experiences: Experience[];
  onChange: (experiences: Experience[]) => void;
}

export function ExperienceForm({ experiences, onChange }: ExperienceFormProps) {
  const handleAdd = () => {
    onChange([
      ...experiences,
      {
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ]);
  };

  const handleRemove = (index: number) => {
    onChange(experiences.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof Experience, value: string) => {
    const updatedExperiences = experiences.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    onChange(updatedExperiences);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Work Experience</h3>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus size={16} /> Add Experience
        </button>
      </div>
      
      {experiences.map((exp, index) => (
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
              value={exp.company}
              onChange={(e) => handleChange(index, 'company', e.target.value)}
              placeholder="Company"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={exp.position}
              onChange={(e) => handleChange(index, 'position', e.target.value)}
              placeholder="Position"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={exp.location}
              onChange={(e) => handleChange(index, 'location', e.target.value)}
              placeholder="Location"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="month"
                value={exp.startDate}
                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                placeholder="Start Date"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="month"
                value={exp.endDate}
                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                placeholder="End Date"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <textarea
            value={exp.description}
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