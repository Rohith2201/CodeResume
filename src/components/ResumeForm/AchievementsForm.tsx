import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Achievement } from '../../types/resume';

interface AchievementsFormProps {
  achievements: Achievement[];
  onChange: (achievements: Achievement[]) => void;
}

export function AchievementsForm({ achievements, onChange }: AchievementsFormProps) {
  const handleAdd = () => {
    onChange([...achievements, { title: '', description: '', date: '' }]);
  };

  const handleRemove = (index: number) => {
    onChange(achievements.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof Achievement, value: string) => {
    const updatedAchievements = achievements.map((achievement, i) =>
      i === index ? { ...achievement, [field]: value } : achievement
    );
    onChange(updatedAchievements);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Achievements</h3>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus size={16} /> Add Achievement
        </button>
      </div>
      
      {achievements.map((achievement, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-4 bg-white shadow-sm">
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
              value={achievement.title}
              onChange={(e) => handleChange(index, 'title', e.target.value)}
              placeholder="Achievement Title"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="month"
              value={achievement.date}
              onChange={(e) => handleChange(index, 'date', e.target.value)}
              placeholder="Date"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <textarea
            value={achievement.description}
            onChange={(e) => handleChange(index, 'description', e.target.value)}
            placeholder="Description"
            rows={2}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}
    </div>
  );
}