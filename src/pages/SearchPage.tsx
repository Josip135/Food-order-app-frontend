import { useParams } from "react-router-dom";
import { useSearchRestaurants } from "../api/RestaurantApi";
import SearchResultInfo from "../components/SearchResultInfo";
import SearchResultCard from "../components/SearchResultCard";
import { useState } from "react";
import SearchBar, { SearchForm } from "../components/SearchBar";
import PaginationSelector from "../components/PaginationSelector";
import VrsteJelaFilter from "../components/VrsteJelaFilter";
import SortOptionDropdown from "../components/SortOptionDropdown";

export type SearchState = {
  searchQuery: string;
  stranica: number;
  odabranaVrstaJela: string[];
  sortOption: string;
}

const SearchPage = () => {
  const { grad } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    stranica: 1,
    odabranaVrstaJela: [],
    sortOption: "najboljaOpcija",
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { results, isLoading } = useSearchRestaurants(searchState, grad);

  const setSortOption = (sortOption: string) => {
    setSearchState((previousState) => ({
      ...previousState,
      sortOption,
      stranica: 1,
    }))
  }

  const setOdabranaVrstaJela = (odabranaVrstaJela: string[]) => {
    setSearchState((previuousState) => ({
      ...previuousState,
      odabranaVrstaJela,
      stranica: 1,
    }))
  }

  const setStranica = (stranica: number) => {
    setSearchState((previousState) => ({
      ...previousState,
      stranica,
    }))
  }

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((previousState) => ({
      ...previousState,
      searchQuery: searchFormData.searchQuery,
      stranica: 1,
    }));
  };

  const resetSearch = () => {
    setSearchState((previousState) => ({
      ...previousState,
      searchQuery: "",
      stranica: 1,
    }));
  };

  if (isLoading) {
    return <span>Učitavanje..</span>
  }

  if (!results?.data || !grad) {
    return <span>Nema rezultata!</span>
  }



  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="vrsteJela-lista">
        <VrsteJelaFilter odabranaVrstaJela={searchState.odabranaVrstaJela} onChange={setOdabranaVrstaJela} isExpanded={isExpanded} onExpandedClick={() => setIsExpanded((prosirenoIliNe) => !prosirenoIliNe)} />
      </div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchBar searchQuery={searchState.searchQuery} onSubmit={setSearchQuery} placeHolder="Pretražite prema vrsti jela ili imenu restorana" onReset={resetSearch} />

        <div className="flex justify-between flex-col gap-3 lg:flex-row">
          <SearchResultInfo total={results.pagination.total} grad={grad} />

          <SortOptionDropdown sortOption={searchState.sortOption} onChange={(value) => setSortOption(value)} />
        </div>


        {results.data.map((restoran) => (
          <SearchResultCard restoran={restoran} />
        ))}

        <PaginationSelector stranica={results.pagination.stranica} stranice={results.pagination.stranice} onPageChange={setStranica} />
      </div>
    </div>
  )
}

export default SearchPage;

/*
<span>Korisnik je tražio restoran u gradu {grad}{" "}

      <span>{results?.data.map((restoran) =>
        <span >
          Pronađen: {restoran.imeRestorana}, {restoran.grad}

        </span>
      )}
      </span>
    </span>
*/