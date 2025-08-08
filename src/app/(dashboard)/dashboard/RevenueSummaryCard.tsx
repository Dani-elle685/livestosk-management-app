"use client";
import { useIncomeReviewMetrics } from "@/infrastructure/dashboard/hooks/use.income.reviewmetrics";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { MetricCard } from "./widgets/MetricCard";
import { Skeleton } from "@/components/ui/skeleton";

const RevenueSummaryCard = () => {
  const { data: metricsData = [], isLoading } = useQuery(
    useIncomeReviewMetrics("12345")
  );
  if (isLoading) {
    return (
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <Skeleton className="aspect-video rounded" />
        <Skeleton className="aspect-video rounded" />
        <Skeleton className="aspect-video rounded" />
        <Skeleton className="aspect-video rounded" />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metricsData.map((metric, index) => (
        <MetricCard key={index} data={metric} />
      ))}
    </div>
  );
};

export default RevenueSummaryCard;
