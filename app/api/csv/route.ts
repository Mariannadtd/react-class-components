import type { CharacterCardData } from "@/types/character";

const isCharacter = (value: unknown): value is CharacterCardData => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const item = value as Record<string, unknown>;
  return (
    typeof item.id === "number" &&
    typeof item.name === "string" &&
    typeof item.description === "string" &&
    typeof item.image === "string"
  );
};

const escapeCsvCell = (value: string | number): string =>
  `"${String(value).replaceAll('"', '""')}"`;

export async function POST(request: Request): Promise<Response> {
  const formData = await request.formData();
  const rawItems = formData.get("items");

  if (typeof rawItems !== "string") {
    return new Response("Invalid selection", { status: 400 });
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(rawItems);
  } catch {
    return new Response("Invalid selection", { status: 400 });
  }

  if (!Array.isArray(parsed) || !parsed.every(isCharacter)) {
    return new Response("Invalid selection", { status: 400 });
  }

  const rows = [
    ["id", "name", "description", "image"],
    ...parsed.map((item) => [item.id, item.name, item.description, item.image]),
  ];
  const csv = rows.map((row) => row.map(escapeCsvCell).join(",")).join("\n");

  return new Response(`\uFEFF${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="selected-characters.csv"',
      "Cache-Control": "no-store",
    },
  });
}
