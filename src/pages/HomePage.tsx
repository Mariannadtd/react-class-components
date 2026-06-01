import { Outlet, useMatch, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  charactersQueryKeys,
  useCharactersQuery,
} from "../api/charactersQueries";
import { Main } from "../components/Main";

const SEARCH_TERM_STORAGE_KEY = "searchTerm";

const getSavedSearchTerm = (): string =>
  localStorage.getItem(SEARCH_TERM_STORAGE_KEY)?.trim() ?? "";

export function HomePage(): React.ReactNode {
  const [currentSearchTerm, setCurrentSearchTerm] = useState(
    getSavedSearchTerm,
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsMatch = useMatch("/details/:detailsId");
  const pageParam = searchParams.get("page");
  const currentPage = pageParam === null ? 1 : Number(pageParam);
  const queryClient = useQueryClient();

  const charactersQuery = useCharactersQuery(currentSearchTerm, currentPage);

  useEffect(() => {
    if (pageParam === null) {
      setSearchParams({ page: "1" });
    }
  }, [pageParam, setSearchParams]);

  const handleInitialSearch = (searchTerm: string): void => {
    setCurrentSearchTerm(searchTerm);
  };

  const handleSearch = (searchTerm: string): void => {
    const trimmedSearchTerm = searchTerm.trim();

    if (trimmedSearchTerm === currentSearchTerm && currentPage === 1) {
      return;
    }

    setCurrentSearchTerm(trimmedSearchTerm);
    setSearchParams({ page: "1" });
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
  };

  const handleRefresh = (): void => {
    void queryClient.invalidateQueries({
      queryKey: charactersQueryKeys.list(currentSearchTerm, currentPage),
    });
  };

  const errorMessage =
    charactersQuery.error instanceof Error ? charactersQuery.error.message : "";

  return (
    <div
      className={
        detailsMatch === null ? "split-view" : "split-view split-view--open"
      }
    >
      <div className="master-panel">
        <Main
          items={charactersQuery.data?.items ?? []}
          isLoading={charactersQuery.isLoading}
          isRefreshing={charactersQuery.isFetching}
          errorMessage={errorMessage}
          onInitialSearch={handleInitialSearch}
          onSearchTermChange={handleSearchTermChange}
          onSearch={handleSearch}
          currentPage={currentPage}
          totalPages={charactersQuery.data?.totalPages ?? 0}
          onPageChange={handlePageChange}
          onRefresh={handleRefresh}
        />
      </div>
      <Outlet />
    </div>
  );
}
