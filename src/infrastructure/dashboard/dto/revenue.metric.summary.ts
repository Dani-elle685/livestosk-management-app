export interface RevenueMetricSummary {
  title: string;
  value: string;
  percentage: string;
  trend: "up" | "down";
  compareText: string;
}
