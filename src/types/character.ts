export interface CharacterApiItem {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: {
    name: string;
  };
}

export interface CharacterApiResponse {
  results: CharacterApiItem[];
}

export interface CharacterCard {
  id: number;
  name: string;
  description: string;
}
