import type {
  CharacterApiItem,
  CharacterApiResponse,
  CharacterCardData,
  CharacterDetailsData,
  CharactersResult,
} from "@/types/character";

const API_URL = "https://rickandmortyapi.com/api/character";

const mapCharacter = (character: CharacterApiItem): CharacterCardData => ({
  id: character.id,
  name: character.name,
  description: `${character.species}, ${character.status}, ${character.gender}. Origin: ${character.origin.name}`,
  image: character.image,
});

export async function fetchCharacters(
  query: string,
  page: number,
): Promise<CharactersResult> {
  const params = new URLSearchParams({ page: String(page) });

  if (query) {
    params.set("name", query);
  }

  const response = await fetch(`${API_URL}?${params}`, { cache: "no-store" });

  if (response.status === 404) {
    return { items: [], totalPages: 0 };
  }

  if (!response.ok) {
    throw new Error("CHARACTERS_LOAD_FAILED");
  }

  const data: CharacterApiResponse = await response.json();

  return {
    items: data.results.map(mapCharacter),
    totalPages: data.info.pages,
  };
}

export async function fetchCharacterDetails(
  id: number,
): Promise<CharacterDetailsData | null> {
  const response = await fetch(`${API_URL}/${id}`, { cache: "no-store" });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("CHARACTER_DETAILS_LOAD_FAILED");
  }

  const character: CharacterApiItem = await response.json();

  return {
    id: character.id,
    name: character.name,
    status: character.status,
    species: character.species,
    gender: character.gender,
    image: character.image,
    origin: character.origin.name,
    location: character.location.name,
  };
}
