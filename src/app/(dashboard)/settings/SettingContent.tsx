import React from 'react';
import Sidebar from './Sidebar';
import SecuritySection from './SecuritySection';
import NotificationsSection from './NotificationSection';
import PaymentSettings from './Paymentsettings';
import AccountSettingForm from './widgets/account.setting.form';
interface SettingsContentProps {
  activeSettingsSection: string;
  onSettingsSectionChange: (section: string) => void;
}

const SettingsContent: React.FC<SettingsContentProps> = ({ 
  activeSettingsSection, 
  onSettingsSectionChange 
}) => {
  const renderSettingsContent = () => {
    switch (activeSettingsSection) {
      case 'security':
        return <SecuritySection />;
      case 'account':
        return <AccountSettingForm/>
      case 'notifications':
        return <NotificationsSection/>;
      case 'payment':
        return <PaymentSettings />;
      default:
        return <SecuritySection />;
    }
  };

  return (
    // <div className="flex h-full">
            <div className="flex flex-col h-full md:flex-row">

      <div className="border-r border-gray-200 bg-gray-50 w-full md:w-80 ">
        <Sidebar
          isOpen={true}
          onToggle={() => {}}
          activeSection={activeSettingsSection}
          onSectionChange={onSettingsSectionChange}
        />
      </div>
      
      <div className="flex-1 p-2 md:p-8 bg-gray-50">
        {renderSettingsContent()}
      </div>
    </div>
  );
};

export default SettingsContent;