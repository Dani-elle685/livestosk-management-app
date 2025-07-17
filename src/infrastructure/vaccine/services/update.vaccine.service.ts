"use server";

import { VaccineModel } from "../validators/vaccine-validators";

export const UpdateVaccineService = async (vaccine:VaccineModel, recordId:number) => {
  console.log("update vaccine==>", vaccine)
}

