"use server";
import { CreditCardFormData } from "../validators/card.information.validator";

export const addCreditCardService = async (data: CreditCardFormData) => {
  console.log("Credit Card Data:", data);
  // Here you would typically make an API call to save the credit card information
  // For example:
  // return await api.post('/credit-card', data);
  
  // Simulating a successful operation
  return Promise.resolve({ success: true, message: "Credit card added successfully." });
}