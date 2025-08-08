import { queryOptions } from "@tanstack/react-query"
import { fetchTotalRevenueTargetRevenue } from "../services/fetch.totalrevenue.targetrevenue"

export const useTotalTargetRevenue = (userId:string) => {
  return queryOptions({
    queryKey: ["totalTargetRevenue", userId],
    queryFn: () => fetchTotalRevenueTargetRevenue(userId),
    staleTime: 1000 * 60 * 5, 
    })
}