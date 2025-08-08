"use server";

import { RevenueMetricSummary } from "../dto/revenue.metric.summary";

export const fetchIncomeDataReview = async (userId: string):Promise<RevenueMetricSummary[]> => {
  return [
  {
    title: "Total Income",
    value: "3,000,000 KES",
    percentage: "8.2%",
    trend: "up" as const,
    compareText: "Compared to last month"
  },
  {
    title: "Total Income", 
    value: "3,000,000 KES",
    percentage: "2.1%",
    trend: "down" as const,
    compareText: "Compared to last month"
  },
  {
    title: "Total Income",
    value: "3,000,000 KES", 
    percentage: "1.7%",
    trend: "up" as const,
    compareText: "Compared to last month"
  },
  {
    title: "Total Income",
    value: "3,000,000 KES",
    percentage: "8.2%", 
    trend: "up" as const,
    compareText: "Compared to last month"
  }
];
};
