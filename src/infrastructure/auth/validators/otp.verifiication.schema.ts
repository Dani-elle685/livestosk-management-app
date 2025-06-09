// otp.verifiication.schema.ts
import { z } from "zod";

export const OtpVerificationSchema = z.object({
  otp: z.string().length(6, "OTP must be exactly 6 digits"),
});

export type OtpVerificationModel = z.infer<typeof OtpVerificationSchema>;
