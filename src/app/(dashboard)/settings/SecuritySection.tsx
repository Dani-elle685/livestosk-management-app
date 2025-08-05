import React, { useState } from 'react';

const SecuritySection: React.FC = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">Security</h2>
      
      <div className="space-y-8">
        {/* Sign-in Email Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-base font-medium text-gray-900">Sign-in Email</h3>
              <p className="text-gray-600 mt-1">Lilykarere@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Password Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-base font-medium text-gray-900">Password</h3>
              <p className="text-gray-600 mt-1">••••••••</p>
            </div>
            <button className="text-red-600 hover:text-red-700 font-medium transition-colors">
              Change Password
            </button>
          </div>
        </div>

        {/* 2FA Authentication Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-base font-medium text-gray-900">2-FA Authentication</h3>
                <p className="text-gray-600 mt-1">Add an extra layer of security to your account</p>
              </div>
              <button
                onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${is2FAEnabled ? 'bg-red-600' : 'bg-gray-200'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${is2FAEnabled ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            {/* Phone Number */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <span className="text-gray-700 font-medium">Phone Number</span>
                <span className="text-gray-600">+250 788 888 888</span>
              </div>
            </div>

            {/* Reserved Codes */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <span className="text-gray-700 font-medium">Reserved Codes</span>
              <span className="text-gray-600">0 of 6 left</span>
            </div>

            {/* Enable 2FA Button */}
            <div className="pt-4">
              <button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
                Enable 2FA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySection;