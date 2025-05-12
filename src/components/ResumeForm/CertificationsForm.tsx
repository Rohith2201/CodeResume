import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Certification } from '../../types/resume';

interface CertificationsFormProps {
  certifications: Certification[];
  onChange: (certifications: Certification[]) => void;
}

export function CertificationsForm({ certifications, onChange }: CertificationsFormProps) {
  const handleAdd = () => {
    onChange([...certifications, { name: '', issuer: '', date: '', expiryDate: '', credentialId: '' }]);
  };

  const handleRemove = (index: number) => {
    onChange(certifications.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof Certification, value: string) => {
    const updatedCertifications = certifications.map((cert, i) =>
      i === index ? { ...cert, [field]: value } : cert
    );
    onChange(updatedCertifications);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Certifications</h3>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus size={16} /> Add Certification
        </button>
      </div>
      
      {certifications.map((cert, index) => (
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
              value={cert.name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
              placeholder="Certification Name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={cert.issuer}
              onChange={(e) => handleChange(index, 'issuer', e.target.value)}
              placeholder="Issuing Organization"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="month"
              value={cert.date}
              onChange={(e) => handleChange(index, 'date', e.target.value)}
              placeholder="Issue Date"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="month"
              value={cert.expiryDate}
              onChange={(e) => handleChange(index, 'expiryDate', e.target.value)}
              placeholder="Expiry Date (Optional)"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={cert.credentialId}
              onChange={(e) => handleChange(index, 'credentialId', e.target.value)}
              placeholder="Credential ID (Optional)"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      ))}
    </div>
  );
}