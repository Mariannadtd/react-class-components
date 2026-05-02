import type {
  CharacterApiItem,
  CharacterApiResponse,
  CharacterCard,
} from "../types/character";

const API_URL = "https://rickandmortyapi.com/api/character/";

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

const mapCharacter = (character: CharacterApiItem): CharacterCard => ({
  id: character.id,
  name: character.name,
  description: `${character.species}, ${character.status}, ${character.gender}. Origin: ${character.origin.name}`,
  image: character.image,
});

export async function fetchCharacters(
  searchTerm: string,
): Promise<CharacterCard[]> {
  const params = new URLSearchParams();

  params.set("page", "1");

  if (searchTerm.length > 0) {
    params.set("name", searchTerm);
  }

  await delay(300);

  const response = await fetch(`${API_URL}?${params.toString()}`);

  if (!response.ok) {
    if (response.status === 404) {
      return [];
    }

    throw new Error(`Request failed with status ${response.status}`);
  }

  const data: CharacterApiResponse = await response.json();

  return data.results.map(mapCharacter);
}
