import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Research } from '../../types/resume';

interface ResearchFormProps {
  research: Research[];
  onChange: (research: Research[]) => void;
}

export function ResearchForm({ research, onChange }: ResearchFormProps) {
  const handleAdd = () => {
    onChange([...research, { 
      title: '', 
      institution: '',
      date: '',
      description: '',
      publication: ''
    }]);
  };

  const handleRemove = (index: number) => {
    onChange(research.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof Research, value: string) => {
    const updatedResearch = research.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onChange(updatedResearch);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Research</h3>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus size={16} /> Add Research
        </button>
      </div>
      
      {research.map((item, index) => (
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
              value={item.title}
              onChange={(e) => handleChange(index, 'title', e.target.value)}
              placeholder="Research Title"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={item.institution}
              onChange={(e) => handleChange(index, 'institution', e.target.value)}
              placeholder="Institution"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="month"
              value={item.date}
              onChange={(e) => handleChange(index, 'date', e.target.value)}
              placeholder="Date"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={item.publication}
              onChange={(e) => handleChange(index, 'publication', e.target.value)}
              placeholder="Publication Link (Optional)"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <textarea
            value={item.description}
            onChange={(e) => handleChange(index, 'description', e.target.value)}
            placeholder="Research Description"
            rows={2}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}
    </div>
  );
}