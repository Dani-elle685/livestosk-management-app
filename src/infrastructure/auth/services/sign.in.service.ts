"use server"
import { SignInFormModel } from "../validators/sign.in.validators";

export const signInService = async (formData: SignInFormModel) => {
  console.log("Sign In Form Data Submitted:", formData);
}