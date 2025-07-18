"use server";
import { PersonalInformationUpdateModel } from "../validators/personal.information.update.validator";

export const updateProfileInfoService = async (
  data: PersonalInformationUpdateModel
) => {
  console.log("the data is", data);
};
