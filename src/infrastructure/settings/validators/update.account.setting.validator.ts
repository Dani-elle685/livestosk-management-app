import {z} from "zod";

export const UpdateAccountSettingSchema = z.object({
  email: z.string().email("Invalid email address"),
  countryCode: z.string().min(1, "Country code is required"),
  phoneNumber: z
    .string()
    .min(1, "M-PESA number is required")
    .refine((value) => {
      const cleanNumber = value.replace(/\s/g, "");
      return /^\d{9,15}$/.test(cleanNumber);
    }, "Number must be between 9 and 15 digits"),
  language: z.string().min(2, "Language must be at least 2 characters"),
  timezone: z.string().min(1, "Timezone is required"),
  country: z.string().min(1, "Country is required"),
});

export type UpdateAccountSettingData = z.infer<typeof UpdateAccountSettingSchema>;