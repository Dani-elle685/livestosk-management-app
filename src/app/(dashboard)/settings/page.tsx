import React from "react";
import AccountImageProfile from "./widgets/account.image.profile";
import PersonalInformation from "./widgets/personal.information";
import OtherInformation from "./widgets/farm.information";

const SettingsPage = () => {
  return (
    <div className="p-3 flex flex-col gap-3">
      <AccountImageProfile />
      <PersonalInformation />
      <OtherInformation />
    </div>
  );
};

export default SettingsPage;
