import {z} from "zod";

export const ResetPasswordFormSchema = z.object({
  password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])/,
        "Password must include uppercase, lowercase, number, and special character"
      ),
  confirmPassword: z.string().min(1, "Confirm Password is required"),
}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
      });
    }
});


export type ResetPasswordFormModel = z.infer<typeof ResetPasswordFormSchema>;