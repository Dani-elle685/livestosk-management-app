import React, { Suspense } from "react";
import TestimonialSection from "./TestimonialSection";
import HomeSection from "./AboutSection";
import ListedLivestocks from "./Listing";
import { listedAnimalsForSale } from "@/infrastructure/marketplace/services/listed.animals.service";

const HomePage = () => {
  return (
    <Suspense>
      <DataFetcher />
    </Suspense>
  );
};

export default HomePage;

const DataFetcher = async () => {
  const listedLivestock = await listedAnimalsForSale();
  return (
    <div className="min-h-screen">
      <HomeSection />
      <ListedLivestocks livestock={listedLivestock} />
      <TestimonialSection />
    </div>
  );
};
