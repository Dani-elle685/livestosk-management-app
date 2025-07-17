"use server";

import { VaccineModel } from "../validators/vaccine-validators";

export const AddVaccineService =async (vaccine:VaccineModel) => {
  console.log("vaccine==>", vaccine)
}

