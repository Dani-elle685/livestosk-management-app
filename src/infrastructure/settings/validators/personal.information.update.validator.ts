import { z } from "zod";

export const PersonalInformationUpdateSchema = z.object({
    firstName:z.string().min(1),
    lastName:z.string().min(1),
    emailAddress:z.string().min(1),
    phoneNumber:z.string().min(1),
    bioInformation:z.string().min(5)
})


export type PersonalInformationUpdateModel = z.infer<typeof PersonalInformationUpdateSchema>
