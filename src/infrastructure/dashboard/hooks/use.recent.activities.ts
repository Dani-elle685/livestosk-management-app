import { queryOptions } from "@tanstack/react-query";
import { fetchRecentActivities } from "../services/fetch.recent.activities";

export const useRecentActivities = (userId: string) => {
  return queryOptions({
    queryKey: ["recentActivities", userId],
    queryFn: () => fetchRecentActivities(userId),
    staleTime: 1000 * 60 * 5, 
  });
}