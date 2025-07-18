import React, { Suspense } from "react";
import { fetchUserProfileInfo } from "@/infrastructure/settings/services/fetch.user.profile.info";
import UserProfileHome from "./user.profile.home";

const UserProfilePage = () => {
  return (
    <Suspense fallback={<div>Loading profile</div>}>
      <FetchData />
    </Suspense>
  );
};

export default UserProfilePage;

const FetchData = async () => {
  const profileData = await fetchUserProfileInfo();

  return <UserProfileHome profileInformation={profileData} />;
};
