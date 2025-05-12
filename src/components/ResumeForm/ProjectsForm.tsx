import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Project } from '../../types/resume';

interface ProjectsFormProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export function ProjectsForm({ projects, onChange }: ProjectsFormProps) {
  const handleAdd = () => {
    onChange([...projects, { 
      title: '', 
      description: '', 
      technologies: [],
      startDate: '',
      endDate: '',
      url: ''
    }]);
  };

  const handleRemove = (index: number) => {
    onChange(projects.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof Project, value: string | string[]) => {
    const updatedProjects = projects.map((project, i) =>
      i === index ? { ...project, [field]: value } : project
    );
    onChange(updatedProjects);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Projects</h3>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>
      
      {projects.map((project, index) => (
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
              value={project.title}
              onChange={(e) => handleChange(index, 'title', e.target.value)}
              placeholder="Project Title"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={project.url}
              onChange={(e) => handleChange(index, 'url', e.target.value)}
              placeholder="Project URL (Optional)"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="month"
                value={project.startDate}
                onChange={(e) => handleChange(index, 'startDate', e.target.value)}
                placeholder="Start Date"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="month"
                value={project.endDate}
                onChange={(e) => handleChange(index, 'endDate', e.target.value)}
                placeholder="End Date"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <textarea
            value={project.description}
            onChange={(e) => handleChange(index, 'description', e.target.value)}
            placeholder="Project Description"
            rows={2}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={project.technologies.join(', ')}
            onChange={(e) => handleChange(index, 'technologies', e.target.value.split(',').map(t => t.trim()))}
            placeholder="Technologies (comma-separated)"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}
    </div>
  );
}