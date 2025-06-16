// utils/locationOptions.ts

export const getCountryOptions = () => [
  { label: "Maldives", value: "MV" },
  { label: "Kenya", value: "KE" },
];

// --- Country > Regions
const regionMap: Record<string, { label: string; value: string }[]> = {
  KE: [
    { label: "Nairobi Region", value: "nairobi" },
    { label: "Central Region", value: "central" },
  ],
  IN: [
    { label: "South India", value: "south" },
    { label: "North India", value: "north" },
  ],
};

export const getRegionsByCountry = (country: string) => {
  return regionMap[country] || [];
};

// --- Region > Counties
const countyMap: Record<string, { label: string; value: string }[]> = {
  nairobi: [
    { label: "Westlands", value: "westlands" },
    { label: "Lang'ata", value: "langata" },
  ],
  central: [
    { label: "Nyeri", value: "nyeri" },
    { label: "Murang'a", value: "muranga" },
  ],
};

export const getCountiesByRegion = (region: string) => {
  return countyMap[region] || [];
};

// --- County > SubCounties
const subCountyMap: Record<string, { label: string; value: string }[]> = {
  westlands: [
    { label: "Kangemi", value: "kangemi" },
    { label: "Mountain View", value: "mountain_view" },
  ],
  nyeri: [
    { label: "Tetu", value: "tetu" },
    { label: "Mathira", value: "mathira" },
  ],
};

export const getSubCountiesByCounty = (county: string) => {
  return subCountyMap[county] || [];
};

// --- SubCounty > Wards
const wardMap: Record<string, { label: string; value: string }[]> = {
  kangemi: [
    { label: "Ward A", value: "ward_a" },
    { label: "Ward B", value: "ward_b" },
  ],
  mountain_view: [
    { label: "Ward C", value: "ward_c" },
    { label: "Ward D", value: "ward_d" },
  ],
};

export const getWardsBySubCounty = (subCounty: string) => {
  return wardMap[subCounty] || [];
};
