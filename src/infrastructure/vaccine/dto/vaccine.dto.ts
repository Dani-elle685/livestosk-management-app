export interface LivestockVaccine {
  recordId?: number;
  livestockId: number;
  vaccineName: string;
  administeredDate: string;
  administeredBy:string;
  status?: string;
  vaccineNotes: string;
}