import z from "zod";

export const MpesaFormSchema = z.object({
  mpesaNumber: z
    .string()
    .min(1, "M-PESA number is required")
    .refine((value) => {
      const cleanNumber = value.replace(/\s/g, "");
      return /^\d{9,15}$/.test(cleanNumber);
    }, "Number must be between 9 and 15 digits"),
  countryCode: z.string().min(1, "Country code is required"),
});

export type MpesaFormValues = z.infer<typeof MpesaFormSchema>;
