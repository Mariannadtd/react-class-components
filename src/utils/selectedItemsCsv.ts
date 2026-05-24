import type { CharacterCard } from "../types/character";

const csvHeaders = ["id", "name", "description", "detailsUrl", "image"];

const escapeCsvCell = (value: string | number): string => {
  const text = String(value);

  return `"${text.replaceAll('"', '""')}"`;
};

const getDetailsUrl = (id: number): string =>
  new URL(`${import.meta.env.BASE_URL}details/${id}`, window.location.origin)
    .href;

export const buildSelectedItemsCsv = (items: CharacterCard[]): string => {
  const rows = items.map((item) =>
    [item.id, item.name, item.description, getDetailsUrl(item.id), item.image]
      .map(escapeCsvCell)
      .join(","),
  );

  return [csvHeaders.join(","), ...rows].join("\n");
};

export const downloadSelectedItemsCsv = (items: CharacterCard[]): void => {
  const csv = buildSelectedItemsCsv(items);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `${items.length}_items.csv`;

  document.body.append(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
};
