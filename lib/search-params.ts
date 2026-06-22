export type SearchParamValue = string | string[] | undefined;

export interface CharacterSearchParams {
  q?: SearchParamValue;
  page?: SearchParamValue;
  selected?: SearchParamValue;
}

const firstValue = (value: SearchParamValue): string =>
  Array.isArray(value) ? (value[0] ?? "") : (value ?? "");

export const getQuery = (value: SearchParamValue): string =>
  firstValue(value).trim().slice(0, 100);

export const getPositiveInteger = (
  value: SearchParamValue,
  fallback: number,
): number => {
  const number = Number(firstValue(value));
  return Number.isSafeInteger(number) && number > 0 ? number : fallback;
};

export const buildSearchQuery = (
  query: string,
  page: number,
  selected?: number,
): { q?: string; page: string; selected?: string } => ({
  ...(query ? { q: query } : {}),
  page: String(page),
  ...(selected ? { selected: String(selected) } : {}),
});
