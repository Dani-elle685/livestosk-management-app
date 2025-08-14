export interface LivestockList {
  recordId: string;
  tagNumber: string;
  name: string;
  type: string;
  breed: string;
  dateOfBirth: string;
  gender: string;
  weight: number;
  color: string;
  imageUrl: string[];
  status: string;
  healthStatus: string;
  purchasePrice: number;
  purchaseDate: string;
  notes: string;
}

export interface FilterState {
  type: string;
  breed: string;
  status: string;
  searchQuery: string;
}