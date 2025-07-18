import "server-only";

import { FarmData } from "../dto/user.profile.dto";

export const fetchUserProfileInfo = async () => {
  const farmData: FarmData = {
    firstName: "Daniel",
    lastName: "Njoroge",
    emailAddress: "daniel.njoroge@example.com",
    phoneNumber: "+254712345678",
    bioInformation:
      "Passionate agripreneur with over 10 years of experience in organic farming.",

    farmName: "Green Acres Farm",
    farmType: "Dairy Farm",
    farmDescription:
      "A sustainable farm growing vegetables and keeping dairy cows.",
    farmSize: 25, // in acres

    country: "KE",
    region: "nairobi",
    county: "westlands",
    subCounty: "kangemi",
    ward: "ward_a",
    farmLocation: "Along Nairobi-Nakuru Highway, 3km past Mai Mahiu town",
    farmCoordinates: "-1.0054, 36.6116",
  };

  return farmData;
};
