import { z } from "zod";

export const PersonalInformationSchema = z.object({
  idNumber: z.string().min(1, "ID Number is required"),
  idType: z.string().min(1, "ID Type is required"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  profileImage: z.any().refine((file) => file, "Profile image is required"),
  idFrontPage: z.any().refine((file) => file, "Front ID image is required"),
  idBackPage: z.any().refine((file) => file, "Back ID image is required"),
});

export type PersonalInformationModel = z.infer<typeof PersonalInformationSchema>

export const FarmInformationSchema = z.object({
  businessName: z.string().min(1, "Business Name is required"),
  businessType: z.string().min(1, "Business Type is required"),
  farmSize: z.string().min(1, "Farm Size is required"),
  farmDescription: z.string().min(1, "Farm Description is required"),
});

export type FarmInformationModel = z.infer<typeof FarmInformationSchema>



export const AddressInformationSchema = z.object({
  nationality: z.string().min(1, "Nationality is required"),
  regions: z.string().min(1, "Region is required"),
  county: z.string().min(1, "County is required"),
  subCounty: z.string().min(1, "Sub County is required"),
  ward: z.string().min(1, "Ward is required"),
  farmLocation: z.string().min(1, "Farm Location is required"),
  coordinates: z.string().min(1, "Coordinates are required"),
});

export type AddressInformationModel = z.infer<typeof AddressInformationSchema>