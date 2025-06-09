"use server";
import { SignUpFormModel } from "../validators/sign.up.validators";

export const signUpService = async (formData: SignUpFormModel) => {
    console.log("Form Data Submitted:", formData);
}