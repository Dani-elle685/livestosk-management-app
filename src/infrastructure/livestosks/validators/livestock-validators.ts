import { z } from "zod";

export const LivestockSchema = z.object({
  tagNumber: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Type is required"),
  breed: z.string().min(1, "Breed is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"), // consider z.coerce.date() if working with Date objects
  gender: z.string().min(1, "Gender is required"),
  weight: z.coerce.number().nonnegative("Weight must be a positive number"),
  color: z.string().min(1, "Color is required"),
  imageUrl: z.string().url("Image URL must be valid"),
  status: z.string().min(1, "Status is required"),
  healthStatus: z.string().min(1, "Health status is required"),

  purchasePrice: z.string().optional(),
  sellingPrice: z.string().optional(),
  purchaseDate: z.string().optional(), // consider z.coerce.date() if needed
  sellingDate: z.string().optional(),
  notes: z.string().optional(),
});


export type LivestockModel = z.infer<typeof LivestockSchema>