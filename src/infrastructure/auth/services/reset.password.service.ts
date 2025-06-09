"use server";
import { ResetPasswordFormModel } from "../validators/reset.password.validators";

export const ResetPasswordService = async (formData:ResetPasswordFormModel)=>{
    console.log("Reset Password Form Schema", formData);
}