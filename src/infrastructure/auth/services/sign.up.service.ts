"use server";
import { postRequest } from "@/infrastructure/api/api.action.call";
import {
  SignUpFormModel,
  SignUpFormSchema,
} from "../validators/sign.up.validators";
import { SIGN_UP_URL } from "../constants";

export const signUpService = async (formData: SignUpFormModel) => {
  const url = SIGN_UP_URL;
  const data = SignUpFormSchema.safeParse(formData);
  if (!data.success) {
    throw new Error("Invalid form data. Please check your input.");
  }
  const validatedData = {
    name: data.data.firstName + " " + data.data.lastName,
    email: data.data.email,
    password: data.data.password,
  };

  try {
    const response = await postRequest({
      url,
      body: validatedData,
    });

    if (response.success) {
      return response.data;
    } else {
      throw new Error(response.message || "Sign-in failed. Please try again.");
    }
  } catch (error: any) {
    throw new Error(`${error.message || "Please try again."}`);
  }
};
