import { FormProvider } from "./context/form-step-context";
import AccountType from "./create-profile/account-type";
import AddressInformation from "./create-profile/address-information";
import FarmInformation from "./create-profile/farming-information";
import PersonalInformation from "./create-profile/profile-information";
import MultiStepForm from "./create-profile/steps";
import ProfileCreation from "./profile-creation-home";

const ProfilePage = () => {
  return (
              <FormProvider>

    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 w-full">
            <ProfileCreation/>

    </div>
              </FormProvider>

  );
};

export default ProfilePage;
