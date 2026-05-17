import type { CharacterCard } from "../types/character";
import { Search } from "./Search";
import { Results } from "./Results";
import { Pagination } from "./Pagination";
import { ErrorButton } from "../ui/ErrorButton";

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
}

export function Main({
  items,
  isLoading,
  errorMessage,
  onInitialSearch,
  onSearchTermChange,
  onSearch,
  currentPage,
  totalPages,
  onPageChange,
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
