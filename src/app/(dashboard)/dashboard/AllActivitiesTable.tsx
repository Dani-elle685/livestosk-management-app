"use client";
import React from "react";
import RecentActivitiesTable from "./widgets/table/RecentActivitiesTable";
import { useQuery } from "@tanstack/react-query";
import { useRecentActivities } from "@/infrastructure/dashboard/hooks/use.recent.activities";
import { Skeleton } from "@/components/ui/skeleton";

const AllActivitiesTable = () => {
  const { data: recentActivities = [], isLoading } = useQuery(
    useRecentActivities("userId")
  );
  if (isLoading) {
    return <Skeleton className="aspect-video rounded w-full" />;
  }
  return (
    <div>
      <RecentActivitiesTable recentActivityData={recentActivities} />
    </div>
  );
};

export default AllActivitiesTable;
