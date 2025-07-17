import React, { Suspense } from "react";
import SingleLivestockHome from "./single.livestock.home";
import { fetchSingleLivestockService } from "@/infrastructure/livestosks/services/fetch.single.livestock.service";
import { fetchLivestockVaccineService } from "@/infrastructure/vaccine/services/fetch.livestock.vaccine.service";

const LivestockIdPage = () => {
  return (
    <Suspense fallback={<div>Loading....</div>}>
      <FetchData />
    </Suspense>
  );
};

export default LivestockIdPage;

const FetchData = async () => {
  const singleLivestock = await fetchSingleLivestockService();
  const vaccineInformation= await fetchLivestockVaccineService();
  return (
    <div>
      <SingleLivestockHome livestockInformation={singleLivestock} vaccineInformation={vaccineInformation}/>
    </div>
  );
};
