"use server";
import { postRequest } from "@/infrastructure/api/api.action.call";
import { getLoginDataFromCookies, saveLoginDataToCookies } from "@/infrastructure/sessions/savedata.cookies";
import { PROFILE_CREATION_URL } from "../constants";

export const profileCreationService = async (formData: any) => {
  const user = await getLoginDataFromCookies();

  const url = PROFILE_CREATION_URL;
  const flattened = {
  userId: user?.user.userId,
  ...formData.personalInfo,
  ...formData.farmInfo,
  ...formData.addressInfo
};

  try {
    const response = await postRequest({
      url,
      body: flattened,
    });

    if (response.success) {
      await saveLoginDataToCookies(response.data);
      return response.data;
    } else {
      throw new Error(response.message || "Profile Creation Failed.");
    }
  } catch (error: any) {
    throw new Error(`${error.message || "Profile Creation ."}`);
  }
};
