import { useQuery } from "react-query";
import { RestoranRezultatPretrazivanja } from "../types";
import { SearchState } from "../pages/SearchPage";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (searchState: SearchState, grad?: string) => {

  const createSearchRequest = async (): Promise<RestoranRezultatPretrazivanja> => {
    const params = new URLSearchParams();

    params.set("searchQuery", searchState.searchQuery);
    params.set("stranica", searchState.stranica.toString());
    params.set("odabranaVrstaJela", searchState.odabranaVrstaJela.join(","));
    params.set("sortOption", searchState.sortOption);

    const response = await fetch(`${API_BASE_URL}/api/restaurant/search/${grad}?${params.toString()}`);

    if (!response.ok) {
      throw new Error("Greška pri hvatanju restorana!")
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery(["searchRestaurant", searchState], createSearchRequest, { enabled: !!grad });

  return {
    results,
    isLoading

  }
}