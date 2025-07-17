
export const UseAddLivestockFormOptions = () => {
    const typeOptions = [
      { label: "Cattle", value: "cattle" },
      { label: "Goat", value: "goat" },
      { label: "Sheep", value: "sheep" },
    ];
    
    const breedOptions: Record<string, { label: string; value: string }[]> = {
      cattle: [
        { label: "Friesian", value: "friesian" },
        { label: "Boran", value: "boran" },
      ],
      goat: [
        { label: "Boer", value: "boer" },
        { label: "Kalahari Red", value: "kalahari" },
      ],
      sheep: [
        { label: "Dorper", value: "dorper" },
        { label: "Merino", value: "merino" },
      ],
    };
    
    const genderOptions = [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ];
    
    const statusOptions = [
      { label: "Active", value: "active" },
      { label: "On Sale", value: "onSale" },
      { label: "Sold", value: "sold" },
      { label: "Dead", value: "dead" },
    ];
    
    const healthStatusOptions = [
      { label: "Healthy", value: "healthy" },
      { label: "Sick", value: "sick" },
      { label: "Injured", value: "injured" },
    ];
    
  return {
    healthStatusOptions,
    statusOptions,
    genderOptions,
    breedOptions, 
    typeOptions
  }
}

