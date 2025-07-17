import { z } from "zod";

export const VaccineScchema = z.object({
  vaccineName: z.string().min(2, "Vaccine Name Required"),
  administeredDate: z.string().min(1, "Date is required"),
  administeredBy: z.string().min(3, "Name is required."),
  status: z.string().min(2, "Status is required"),
  vaccineNotes: z.string().min(2, "Any notes"),
});

export type VaccineModel = z.infer<typeof VaccineScchema>;
