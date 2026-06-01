import type { CharacterCard } from "../types/character";
import { Search } from "./Search";
import { Results } from "./Results";
import { Pagination } from "./Pagination";
import { ErrorButton } from "../ui/ErrorButton";
import { Button } from "../ui/Button";

interface MainProps {
  items: CharacterCard[];
  isLoading: boolean;
  errorMessage: string;
  onInitialSearch: (searchTerm: string) => void;
  onSearchTermChange: () => void;
  onSearch: (searchTerm: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isRefreshing: boolean;
  onRefresh: () => void;
}

export function Main({
  items,
  isLoading,
  isRefreshing,
  errorMessage,
  onInitialSearch,
  onSearchTermChange,
  onSearch,
  currentPage,
  totalPages,
  onPageChange,
  onRefresh,
}: MainProps): React.ReactNode {
  return (
    <main className="layout">
      <section className="search-section">
        <Search
          onInitialSearch={onInitialSearch}
          onSearchTermChange={onSearchTermChange}
          onSearch={onSearch}
        />
      </section>

      <section className="results-section">
        <div className="results-section__header">
          <h2>Results</h2>

          <Button type="button" onClick={onRefresh} disabled={isRefreshing}>
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
        </div>

        <Results
          items={items}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </section>

      <ErrorButton />
    </main>
  );
}
