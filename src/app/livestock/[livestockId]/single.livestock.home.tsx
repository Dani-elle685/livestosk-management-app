import React from "react";
import LivestockVaccineTable from "./table/livestock.vaccine";
import LivestockInformationCard from "./information/livestock.information.card";
import { Livestock } from "@/infrastructure/livestosks/dto/livestock-dto";
import { LivestockVaccine } from "@/infrastructure/vaccine/dto/vaccine.dto";

interface Props {
  livestockInformation: Livestock;
  vaccineInformation: LivestockVaccine[];
}

const SingleLivestockHome: React.FC<Props> = ({
  livestockInformation,
  vaccineInformation,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <LivestockInformationCard livestockInfo={livestockInformation} />
      <LivestockVaccineTable livestockVaccineData={vaccineInformation} />
    </div>
  );
};

export default SingleLivestockHome;
