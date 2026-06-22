export interface CharacterApiItem {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  origin: { name: string };
  location: { name: string };
}

export interface CharacterApiResponse {
  info: { pages: number };
  results: CharacterApiItem[];
}

export interface CharacterCardData {
  id: number;
  name: string;
  description: string;
  image: string;
}

export interface CharacterDetailsData {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  origin: string;
  location: string;
}

export interface CharactersResult {
  items: CharacterCardData[];
  totalPages: number;
}
