import type {
  CharacterApiItem,
  CharacterApiResponse,
  CharacterCard,
  CharacterDetailsData,
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

const mapCharacterDetails = (
  character: CharacterApiItem,
): CharacterDetailsData => ({
  id: character.id,
  name: character.name,
  status: character.status,
  species: character.species,
  type: character.type,
  gender: character.gender,
  image: character.image,
  origin: character.origin.name,
  location: character.location.name,
});

interface CharactersResult {
  items: CharacterCard[];
  totalPages: number;
}

export async function fetchCharacters(
  searchTerm: string,
  page: number,
): Promise<CharactersResult> {
  const params = new URLSearchParams();

  params.set("page", page.toString());

  if (searchTerm.length > 0) {
    params.set("name", searchTerm);
  }

  await delay(300);

  const response = await fetch(`${API_URL}?${params.toString()}`);

  if (!response.ok) {
    if (response.status === 404) {
      return {
        items: [],
        totalPages: 0,
      };
    }

    throw new Error(`Request failed with status ${response.status}`);
  }

  const data: CharacterApiResponse = await response.json();

  return {
    items: data.results.map(mapCharacter),
    totalPages: data.info.pages,
  };
}

export async function fetchCharacterDetails(
  id: number,
): Promise<CharacterDetailsData> {
  await delay(300);

  const response = await fetch(`${API_URL}${id}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data: CharacterApiItem = await response.json();

  return mapCharacterDetails(data);
}
