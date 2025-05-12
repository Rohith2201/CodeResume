import React from 'react';
import { PersonalInfo } from '../../types/resume';

interface PersonalInfoFormProps {
  personalInfo: PersonalInfo;
  onChange: (info: PersonalInfo) => void;
}

export function PersonalInfoForm({ personalInfo, onChange }: PersonalInfoFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...personalInfo, [name]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Personal Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="fullName"
          value={personalInfo.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          value={personalInfo.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="tel"
          name="phone"
          value={personalInfo.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="location"
          value={personalInfo.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="url"
          name="linkedin"
          value={personalInfo.linkedin}
          onChange={handleChange}
          placeholder="LinkedIn Profile URL"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="url"
          name="github"
          value={personalInfo.github}
          onChange={handleChange}
          placeholder="GitHub Profile URL"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="url"
          name="codeforces"
          value={personalInfo.codeforces}
          onChange={handleChange}
          placeholder="Codeforces Profile URL"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="url"
          name="hackerrank"
          value={personalInfo.hackerrank}
          onChange={handleChange}
          placeholder="HackerRank Profile URL"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="url"
          name="website"
          value={personalInfo.website}
          onChange={handleChange}
          placeholder="Personal Website URL"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 col-span-2"
        />
      </div>
      <textarea
        name="summary"
        value={personalInfo.summary}
        onChange={handleChange}
        placeholder="Professional Summary"
        rows={4}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}