import { describe, expect, it } from "vitest";
import { queryCacheTtl, queryClient } from "./queryClient";

describe("queryClient", () => {
  it("uses configured TTL for query cache settings", () => {
    const queryOptions = queryClient.getDefaultOptions().queries;

    expect(queryCacheTtl).toBe(300000);
    expect(queryOptions?.staleTime).toBe(queryCacheTtl);
    expect(queryOptions?.gcTime).toBe(queryCacheTtl);
    expect(queryOptions?.retry).toBe(false);
  });
});
