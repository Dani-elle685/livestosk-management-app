"use server";
import { MpesaFormValues } from "../validators/mpesa.information.validator";

export const addMpesaInformationService = async (data: MpesaFormValues) => {
  console.log("Credit Card Data:", data);
  // Here you would typically make an API call to save the credit card information
  // For example:
  // return await api.post('/credit-card', data);
  
  // Simulating a successful operation
  return Promise.resolve({ success: true, message: "Credit card added successfully." });
}