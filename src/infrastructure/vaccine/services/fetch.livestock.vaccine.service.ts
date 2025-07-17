"use server";

import { LivestockVaccine } from "../dto/vaccine.dto";

export const fetchLivestockVaccineService = async ()=>{
 const livestockVaccineMockData: LivestockVaccine[] = [
  {
    recordId: 1,
    livestockId: 101,
    vaccineName: "Foot and Mouth Disease",
    administeredDate: "2025-07-01",
    administeredBy: "Dr. Jane Mwangi",
    status: "Completed",
    vaccineNotes: "Animal showed no adverse reaction.",
  },
  {
    recordId: 2,
    livestockId: 102,
    vaccineName: "Lumpy Skin Disease",
    administeredDate: "2025-06-15",
    administeredBy: "Dr. John Otieno",
    status: "Completed",
    vaccineNotes: "Follow-up in 3 months.",
  },
  {
    recordId: 3,
    livestockId: 103,
    vaccineName: "Brucellosis",
    administeredDate: "2025-07-10",
    administeredBy: "Dr. Amina Hassan",
    status: "Pending",
    vaccineNotes: "Awaiting confirmation from vet officer.",
  },
  {
    recordId: 4,
    livestockId: 104,
    vaccineName: "Anthrax",
    administeredDate: "2025-07-05",
    administeredBy: "Dr. Peter Kariuki",
    status: "Completed",
    vaccineNotes: "Booster needed in 1 year.",
  },
  {
    recordId: 5,
    livestockId: 105,
    vaccineName: "Blackleg",
    administeredDate: "2025-06-28",
    administeredBy: "Dr. Mercy Wanjiru",
    status: "Completed",
    vaccineNotes: "Keep animal under observation for 2 days.",
  },
];
return livestockVaccineMockData
}