"use server";
import { postRequest } from "@/infrastructure/api/api.action.call";
import { SignInFormModel } from "../validators/sign.in.validators";
import { LOGIN_API_URL } from "../constants";
import { saveLoginDataToCookies } from "@/infrastructure/sessions/savedata.cookies";

export const signInService = async (formData: SignInFormModel) => {
  const url = LOGIN_API_URL;
  try {
    const response = await postRequest({
      url,
      body: formData,
    });

    if (response.success) {
      await saveLoginDataToCookies(response.data);
      return response.data;
    } else {
      throw new Error(response.message || "Sign-in failed. Please try again.");
    }
  } catch (error: any) {
    throw new Error(`${error.message || "Please try again."}`);
  }
};
