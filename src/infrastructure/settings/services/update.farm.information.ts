"use server";
import { FarmInformationUpdateModel } from "../validators/farm.information.update.validator";

export const updateFarmInfoService = async (
  data: FarmInformationUpdateModel
) => {
  console.log("the data is", data);
};
