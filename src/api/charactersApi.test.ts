import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchCharacterDetails, fetchCharacters } from "./charactersApi";

describe("fetchCharacters", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns characters when request is successful", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        info: {
          pages: 42,
        },
        results: [
          {
            id: 1,
            name: "Rick Sanchez",
            status: "Alive",
            species: "Human",
            type: "",
            gender: "Male",
            image: "https://example.com/rick.png",
            origin: {
              name: "Earth",
            },
            location: {
              name: "Citadel of Ricks",
            },
          },
        ],
      }),
    } as Response);

    vi.stubGlobal("fetch", fetchMock);
    const result = await fetchCharacters("Rick", 1);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining("page=1&name=Rick"),
    );
    expect(result).toEqual({
      items: [
        {
          id: 1,
          name: "Rick Sanchez",
          description: "Human, Alive, Male. Origin: Earth",
          image: "https://example.com/rick.png",
        },
      ],
      totalPages: 42,
    });
  });

  it("returns empty array when character is not found", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    } as Response);
    vi.stubGlobal("fetch", fetchMock);
    const result = await fetchCharacters("Unknown", 1);
    expect(result).toEqual({
      items: [],
      totalPages: 0,
    });
  });

  it("throws error when request fails", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);
    vi.stubGlobal("fetch", fetchMock);
    await expect(fetchCharacters("Rick", 1)).rejects.toThrow(
      "Request failed with status 500",
    );
  });

  it("returns character details by id", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        id: 1,
        name: "Rick Sanchez",
        status: "Alive",
        species: "Human",
        type: "",
        gender: "Male",
        image: "https://example.com/rick.png",
        origin: {
          name: "Earth",
        },
        location: {
          name: "Citadel of Ricks",
        },
      }),
    } as Response);

    vi.stubGlobal("fetch", fetchMock);

    await expect(fetchCharacterDetails(1)).resolves.toEqual({
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "Male",
      image: "https://example.com/rick.png",
      origin: "Earth",
      location: "Citadel of Ricks",
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://rickandmortyapi.com/api/character/1",
    );
  });
});
