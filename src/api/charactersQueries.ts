import { useQuery } from "@tanstack/react-query";
import {
  fetchCharacterDetails,
  fetchCharacters,
  type CharactersResult,
} from "./charactersApi";
import type { CharacterDetailsData } from "../types/character";

export const charactersQueryKeys = {
  all: ["characters"] as const,
  lists: () => [...charactersQueryKeys.all, "list"] as const,
  list: (searchTerm: string, page: number) =>
    [...charactersQueryKeys.lists(), { searchTerm, page }] as const,
  details: () => [...charactersQueryKeys.all, "details"] as const,
  detail: (id: number) => [...charactersQueryKeys.details(), id] as const,
};

export const useCharactersQuery = (
  searchTerm: string,
  page: number,
): ReturnType<typeof useQuery<CharactersResult, Error>> =>
  useQuery<CharactersResult, Error>({
    queryKey: charactersQueryKeys.list(searchTerm, page),
    queryFn: () => fetchCharacters(searchTerm, page),
  });

export const useCharacterDetailsQuery = (
  id: number,
  enabled: boolean,
): ReturnType<typeof useQuery<CharacterDetailsData, Error>> =>
  useQuery<CharacterDetailsData, Error>({
    queryKey: charactersQueryKeys.detail(id),
    queryFn: () => fetchCharacterDetails(id),
    enabled,
  });
