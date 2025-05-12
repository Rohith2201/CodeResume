import React from 'react';

export function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="space-y-6 text-gray-600">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
          <p>We collect information that you provide directly to us when using our resume builder service, including:</p>
          <ul className="list-disc ml-6 mt-2 space-y-2">
            <li>Personal information (name, email, phone number)</li>
            <li>Professional information (work experience, education, skills)</li>
            <li>Resume content and formatting preferences</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul className="list-disc ml-6 mt-2 space-y-2">
            <li>Provide and improve our resume building service</li>
            <li>Generate your resume in various formats</li>
            <li>Analyze resume content for ATS optimization</li>
            <li>Communicate with you about our services</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Data Retention</h2>
          <p>We retain your information for as long as necessary to provide our services and comply with legal obligations.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc ml-6 mt-2 space-y-2">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Object to processing of your information</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at privacy@coderesume.com</p>
        </section>
      </div>
    </div>
  );
}