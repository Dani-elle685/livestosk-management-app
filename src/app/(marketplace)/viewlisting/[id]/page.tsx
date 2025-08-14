import React, { Suspense } from "react";
import { LivestockDetailPage } from "./LivestockDetailPage";
import { listedAnimalsForSale } from "@/infrastructure/marketplace/services/listed.animals.service";

const page = () => {
  return (
    <Suspense>
      <DataFetcher />
    </Suspense>
  );
};

export default page;

const DataFetcher = async () => {
  const listedAnimals = await listedAnimalsForSale();

  return <LivestockDetailPage listedAnmals={listedAnimals} />;
};
