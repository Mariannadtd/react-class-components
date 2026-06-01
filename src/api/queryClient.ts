import { QueryClient } from "@tanstack/react-query";

const DEFAULT_QUERY_CACHE_TTL_MS = 5 * 60 * 1000;

const parseQueryCacheTtl = (value: string | undefined): number => {
  if (value === undefined) {
    return DEFAULT_QUERY_CACHE_TTL_MS;
  }

  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue) || parsedValue < 0) {
    return DEFAULT_QUERY_CACHE_TTL_MS;
  }

  return parsedValue;
};

export const queryCacheTtl = parseQueryCacheTtl(
  import.meta.env.VITE_QUERY_CACHE_TTL_MS,
);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: queryCacheTtl,
      gcTime: queryCacheTtl,
      retry: false,
    },
  },
});
