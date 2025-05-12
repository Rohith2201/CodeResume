import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Skill } from '../../types/resume';

interface SkillsFormProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
}

export function SkillsForm({ skills, onChange }: SkillsFormProps) {
  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const;

  const handleAdd = () => {
    onChange([...skills, { name: '', level: 'Beginner' }]);
  };

  const handleRemove = (index: number) => {
    onChange(skills.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof Skill, value: string) => {
    const updatedSkills = skills.map((skill, i) =>
      i === index ? { ...skill, [field]: value } : skill
    );
    onChange(updatedSkills);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Skills</h3>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus size={16} /> Add Skill
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="text"
              value={skill.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
              placeholder="Skill name"
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={skill.level}
              onChange={(e) => handleChange(index, 'level', e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {skillLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            <button
              onClick={() => handleRemove(index)}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}