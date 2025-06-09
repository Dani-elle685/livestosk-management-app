"use server";
import { postRequest } from "@/infrastructure/api/api.action.call";
import { OtpVerificationModel } from "../validators/otp.verifiication.schema";

export const OtpVerificationService = async (
  email: string,
  formData: OtpVerificationModel
) => {
  const url = "/auth/validate-otp";
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
  const url = "/auth/generate-otp";
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
