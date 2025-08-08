import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RevenueMetricSummary } from "@/infrastructure/dashboard/dto/revenue.metric.summary";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  data:RevenueMetricSummary
}

export function MetricCard({
  data
}: MetricCardProps) {
  const isPositive = data.trend === "up";

  return (
    <Card className="h-full rounded">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {data.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2">{data.value}</div>
        <div className="flex items-center text-sm">
          {isPositive ? (
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
          )}
          <span className={isPositive ? "text-green-500" : "text-red-500"}>
            {data.percentage}
          </span>
          <span className="text-muted-foreground ml-2">{data.compareText}</span>
        </div>
      </CardContent>
    </Card>
  );
}
