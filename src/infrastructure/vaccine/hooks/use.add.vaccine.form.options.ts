
export const UseAddVaccineFormOptions = () => {
      const vaccineStatus = [
    { label: "To be Administered", value: "Pending" },
    { label: "Complete", value: "Complete" },
  ];

  const vaccineOptions = [
    { label: "Brucellosis", value: "Brucellosis" },
    { label: "Foot and Mouth", value: "Foot and Mouth" },
  ];
  return{
    vaccineOptions,
    vaccineStatus
  }
}

