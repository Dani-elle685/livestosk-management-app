"use server";

import { Livestock } from "../dto/livestock-dto";

export const fetchAllLivestockService = async ()=>{
const data: Livestock[] = [
  {
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
  },
  {
    recordId: "REC002",
    tagNumber: "LIV002",
    name: "Spot",
    type: "Pig",
    breed: "Yorkshire",
    dateOfBirth: "2021-08-22",
    gender: "male",
    weight: 250,
    color: "Pink",
    imageUrl: "",
    status: "Sick",
    healthStatus: "Excellent",
    purchasePrice: 450,
    purchaseDate: "2021-09-05",
    notes: "Fast grower"
  },
  {
    recordId: "REC003",
    tagNumber: "LIV003",
    name: "Woolly",
    type: "Sheep",
    breed: "Merino",
    dateOfBirth: "2019-11-30",
    gender: "Female",
    weight: 180,
    color: "White",
    imageUrl: "",
    status: "Retired",
    healthStatus: "Fair",
    purchasePrice: 350,
    purchaseDate: "2020-01-15",
    notes: "Retired from breeding"
  },
  {
    recordId: "REC004",
    tagNumber: "LIV003",
    name: "Woolly",
    type: "Sheep",
    breed: "Merino",
    dateOfBirth: "2019-11-30",
    gender: "Female",
    weight: 180,
    color: "White",
    imageUrl: "",
    status: "Retired",
    healthStatus: "Fair",
    purchasePrice: 350,
    purchaseDate: "2020-01-15",
    notes: "Retired from breeding"
  }
];

return data;

}