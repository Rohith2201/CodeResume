import React from 'react';

export function TermsConditions() {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      
      <div className="space-y-6 text-gray-600">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
          <p>By accessing and using CodeResume, you accept and agree to be bound by these Terms and Conditions.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Use License</h2>
          <p>We grant you a personal, non-exclusive, non-transferable license to use our resume builder service for creating and managing your resumes.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. User Content</h2>
          <ul className="list-disc ml-6 mt-2 space-y-2">
            <li>You retain all rights to the content you create using our service</li>
            <li>You are responsible for the accuracy of information in your resume</li>
            <li>You agree not to submit false or misleading information</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Prohibited Uses</h2>
          <p>You may not use CodeResume for:</p>
          <ul className="list-disc ml-6 mt-2 space-y-2">
            <li>Any unlawful purpose</li>
            <li>Harassing or impersonating others</li>
            <li>Distributing malware or harmful code</li>
            <li>Attempting to gain unauthorized access</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Disclaimer</h2>
          <p>CodeResume is provided "as is" without warranties of any kind, either express or implied.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Limitation of Liability</h2>
          <p>We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our service.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Changes to Terms</h2>
          <p>We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of updated terms.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Contact</h2>
          <p>For questions about these Terms and Conditions, please contact us at legal@coderesume.com</p>
        </section>
      </div>
    </div>
  );
}