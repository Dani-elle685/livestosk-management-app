"use server";
import { postRequest } from "@/infrastructure/api/api.action.call";
import { OtpVerificationModel } from "../validators/otp.verifiication.schema";
import { GENERATE_OTP_URL, VALIDATE_OTP_URL } from "../constants";

export const OtpVerificationService = async (
  email: string,
  formData: OtpVerificationModel
) => {
  const url = VALIDATE_OTP_URL;
  try {
    const response = await postRequest({
      url,
      body: { email, code: formData.otp },
    });

    if (response.success) {
      return response.data;
    } else {
      throw new Error(
        response.message || "Failed to validate OTP. Please try again."
      );
    }
  } catch (error: any) {
    throw new Error(`${error.message || "Please try again."}`);
  }
};

export const generateOtp = async (email: string) => {
  const url = GENERATE_OTP_URL;
  try {
    const response = await postRequest({
      url,
      body: { email },
    });

    if (response.success) {
      return response.data;
    } else {
      throw new Error(
        response.message || "Failed to generate OTP. Please try again."
      );
    }
  } catch (error: any) {
    throw new Error(`${error.message || "Please try again."}`);
  }
};
