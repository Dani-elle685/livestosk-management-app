import React, { useState } from 'react';

const NotificationsSection: React.FC = () => {
  const [doNotDisturb, setDoNotDisturb] = useState(false);
  const [reportFrequency, setReportFrequency] = useState('daily');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [inAppNotifications, setInAppNotifications] = useState(true);

  const handleSaveChanges = () => {
    // Handle save logic here
    console.log('Saving notification preferences...');
  };

  const handleCancel = () => {
    // Handle cancel logic here
    console.log('Cancelling changes...');
  };

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">Notifications</h2>
      
      <div className="space-y-8">
        
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Do not Disturb</h3>
              <p className="text-gray-600 text-sm mt-1">Pause all Notifications</p>
            </div>
            <button
              onClick={() => setDoNotDisturb(!doNotDisturb)}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${doNotDisturb ? 'bg-red-600' : 'bg-gray-200'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${doNotDisturb ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>
        </div>

        {/* Reports Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Reports</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: 'daily', label: 'Daily' },
              { id: 'bi-weekly', label: 'Bi Weekly' },
              { id: 'weekly', label: 'Weekly' },
              { id: 'monthly', label: 'Monthly' }
            ].map((option) => (
              <label key={option.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="reportFrequency"
                  value={option.id}
                  checked={reportFrequency === option.id}
                  onChange={(e) => setReportFrequency(e.target.value)}
                  className="w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                />
                <span className="text-gray-700 text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Notification Types Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="space-y-6">
            {/* Email Notifications */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${emailNotifications ? 'bg-red-600' : 'bg-gray-200'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${emailNotifications ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            {/* SMS Notifications */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">SMS Notifications</h3>
              <button
                onClick={() => setSmsNotifications(!smsNotifications)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${smsNotifications ? 'bg-red-600' : 'bg-gray-200'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${smsNotifications ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            {/* Push Notifications */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Push Notifications</h3>
              <button
                onClick={() => setPushNotifications(!pushNotifications)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${pushNotifications ? 'bg-red-600' : 'bg-gray-200'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${pushNotifications ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>

            {/* In-App Notifications */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">In-App Notifications</h3>
              <button
                onClick={() => setInAppNotifications(!inAppNotifications)}
                className={`
                  relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                  ${inAppNotifications ? 'bg-red-600' : 'bg-gray-200'}
                `}
              >
                <span
                  className={`
                    inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                    ${inAppNotifications ? 'translate-x-6' : 'translate-x-1'}
                  `}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button
            onClick={handleCancel}
            className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveChanges}
            className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationsSection;