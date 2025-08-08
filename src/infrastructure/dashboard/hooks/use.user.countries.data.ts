import { queryOptions } from "@tanstack/react-query";
import { fetchUserCountries } from "../services/fetch.user.countries";

export const useUserCountriesData = (userId: string) => {
  return queryOptions({
    queryKey: ["userCountries", userId],
    queryFn: () => fetchUserCountries(userId),
    staleTime: 1000 * 60 * 5, 
  });
}