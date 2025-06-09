"use server";
import { OtpVerificationModel } from "../validators/otp.verifiication.schema";

export const OtpVerificationService = async (formData: OtpVerificationModel) => {
  console.log("OTP Verification Form Data", formData);
  // Here you would typically send the OTP to your backend for verification
  // For example:
  // const response = await fetch('/api/verify-otp', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(formData),
  // });
  // return response.json();
};


export const generateOtp = async (email:string) => {
  // Generate a random 6-digit OTP
  console.log("Generating OTP for email:", email);
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
}


