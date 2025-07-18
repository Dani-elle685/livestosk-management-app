import { z } from "zod";

export const FarmInformationUpdateSchema = z.object({
    farmName:z.string().min(1),
    FarmType:z.string().min(1),
    farmDescription:z.string().min(5),
    farmSize:z.coerce.number().nonnegative("Farm Size must be a positive number"),

    country:z.string().min(1),
    region:z.string().min(1),
    county:z.string().min(1),
    subCounty:z.string().min(1),
    ward:z.string().min(1),
    farmLocation:z.string().min(1),
    farmCoordinates:z.string().min(1),

})


export type FarmInformationUpdateModel = z.infer<typeof FarmInformationUpdateSchema>
