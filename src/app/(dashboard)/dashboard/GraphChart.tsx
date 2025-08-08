"use client";

import React from "react";
import { ChartAreaInteractive } from "./widgets/LineChart";
import { useQuery } from "@tanstack/react-query";
import { useTotalTargetRevenue } from "@/infrastructure/dashboard/hooks/use.total.target.revenue";
import { Skeleton } from "@/components/ui/skeleton";

const GraphChart = () => {
  const { data: chartData = [], isLoading } = useQuery(
    useTotalTargetRevenue("userId")
  );
  if (isLoading) {
    return <Skeleton className="aspect-video rounded" />;
  }
  return (
    <div>
      <ChartAreaInteractive chartData={chartData} />
    </div>
  );
};

export default GraphChart;
