import { z } from "zod";

export const FarmInformationUpdateSchema = z.object({
    farmName:z.string().min(1),
    FarmType:z.string().min(1),
    farmDescription:z.string().min(1),
    farmLocation:z.string().min(1),
    farmCoordinates:z.string().min(5),
    farmSize:z.number().min(1),

})


export type FarmInformationUpdateModel = z.infer<typeof FarmInformationUpdateSchema>
