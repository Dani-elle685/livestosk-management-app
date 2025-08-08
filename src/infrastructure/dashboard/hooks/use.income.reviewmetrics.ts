import { queryOptions } from "@tanstack/react-query"
import { fetchIncomeDataReview } from "../services/fetch.income.datareview"


export const useIncomeReviewMetrics = (userId:string) => {
  return queryOptions({
    queryKey: ["incomeReviewMetrics", userId],
    queryFn: () =>fetchIncomeDataReview(userId),
    staleTime: 1000 * 60 * 5, 
  })
}