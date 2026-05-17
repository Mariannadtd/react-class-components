import { Outlet, useMatch, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCharacters } from "../api/charactersApi";
import { Main } from "../components/Main";
import type { CharacterCard } from "../types/character";

export function HomePage(): React.ReactNode {
  const [items, setItems] = useState<CharacterCard[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsMatch = useMatch("/details/:detailsId");
  const pageParam = searchParams.get("page");
  const currentPage = pageParam === null ? 1 : Number(pageParam);

  useEffect(() => {
    if (pageParam === null) {
      setSearchParams({ page: "1" });
    }
  }, [pageParam, setSearchParams]);

  const loadCharacters = async (
    searchTerm: string,
    page: number,
  ): Promise<void> => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const result = await fetchCharacters(searchTerm, page);

      setItems(result.items);
      setTotalPages(result.totalPages);
      setIsLoading(false);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unknown error occurred while loading data";

      setItems([]);
      setIsLoading(false);
      setErrorMessage(message);
      setTotalPages(0);
    }
  };

  const handleInitialSearch = (searchTerm: string): void => {
    setCurrentSearchTerm(searchTerm);
    void loadCharacters(searchTerm, currentPage);
  };

  const handleSearch = (searchTerm: string): void => {
    const trimmedSearchTerm = searchTerm.trim();

    if (trimmedSearchTerm === currentSearchTerm && currentPage === 1) {
      return;
    }

    setCurrentSearchTerm(trimmedSearchTerm);
    setSearchParams({ page: "1" });
    void loadCharacters(trimmedSearchTerm, 1);
  };

  const handleSearchTermChange = (): void => {
    if (currentPage !== 1) {
      setSearchParams({ page: "1" });
    }
  };

  const handlePageChange = (page: number): void => {
    setSearchParams({
      page: page.toString(),
    });
    void loadCharacters(currentSearchTerm, page);
  };

  return (
    <div
      className={
        detailsMatch === null ? "split-view" : "split-view split-view--open"
      }
    >
      <div className="master-panel">
        <Main
          items={items}
          isLoading={isLoading}
          errorMessage={errorMessage}
          onInitialSearch={handleInitialSearch}
          onSearchTermChange={handleSearchTermChange}
          onSearch={handleSearch}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <Outlet />
    </div>
  );
}
