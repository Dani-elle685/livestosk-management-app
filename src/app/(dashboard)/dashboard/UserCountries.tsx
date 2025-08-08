"use client";
import React from "react";
import { CountryProgress } from "./widgets/CountryProgress";
import { useUserCountriesData } from "@/infrastructure/dashboard/hooks/use.user.countries.data";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

const UserCountriesData = () => {
  const { data: userCountries = [], isLoading } = useQuery(
    useUserCountriesData("userId")
  );

  if (isLoading) {
    return <Skeleton className=" aspect-video rounded-md" />;
  }
  return <CountryProgress countries={userCountries} />;
};

export default UserCountriesData;
