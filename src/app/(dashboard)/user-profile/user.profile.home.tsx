import React from "react";
import AccountImageProfile from "./widgets/account.image.profile";
import PersonalInformation from "./widgets/personal.information";
import OtherInformation from "./widgets/farm.information";
import { FarmData } from "@/infrastructure/settings/dto/user.profile.dto";

interface Props {
  profileInformation: FarmData;
}
const UserProfileHome: React.FC<Props> = ({ profileInformation }) => {
  return (
    <div className="p-3 flex flex-col gap-3">
      <AccountImageProfile profileInformation={profileInformation} />
      <PersonalInformation profileInformation={profileInformation} />
      <OtherInformation profileInformation={profileInformation} />
    </div>
  );
};

export default UserProfileHome;
