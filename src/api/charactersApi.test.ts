import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchCharacters } from "./charactersApi";

describe("fetchCharacters", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns characters when request is successful", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        results: [
          {
            id: 1,
            name: "Rick Sanchez",
            status: "Alive",
            species: "Human",
            gender: "Male",
            image: "https://example.com/rick.png",
            origin: {
              name: "Earth",
            },
          },
        ],
      }),
    } as Response);

    vi.stubGlobal("fetch", fetchMock);
    const result = await fetchCharacters("Rick");
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("name=Rick"),
    );
    expect(result).toEqual([
      {
        id: 1,
        name: "Rick Sanchez",
        description: "Human, Alive, Male. Origin: Earth",
        image: "https://example.com/rick.png",
      },
    ]);
  });

  it("returns empty array when character is not found", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    } as Response);
    vi.stubGlobal("fetch", fetchMock);
    const result = await fetchCharacters("Unknown");
    expect(result).toEqual([]);
  });

  it("throws error when request fails", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);
    vi.stubGlobal("fetch", fetchMock);
    await expect(fetchCharacters("Rick")).rejects.toThrow(
      "Request failed with status 500",
    );
  });
});
