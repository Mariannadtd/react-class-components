export interface CharacterApiItem {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
}

export interface CharacterApiResponse {
  info: {
    pages: number;
  };
  results: CharacterApiItem[];
}

export interface CharacterCard {
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
  type: string;
  gender: string;
  image: string;
  origin: string;
  location: string;
}
