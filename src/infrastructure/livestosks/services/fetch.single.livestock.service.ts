"use server";

export const fetchSingleLivestockService = async ()=>{
    const data = {
    recordId: "REC001",
    tagNumber: "LIV001",
    name: "Bessie",
    type: "cattle",
    breed: "friesian",
    dateOfBirth: "2020-05-15",
    gender: "female",
    weight: 650,
    color: "Black and White",
    imageUrl: "",
    status: "sold",
    healthStatus: "healthy",
    purchasePrice: 1200,
    purchaseDate: "2021-03-10",
    notes: "Healthy, good milk production"
  }

  return data;
}