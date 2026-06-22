"use client";

import { useTranslations } from "next-intl";
import type { CharacterCardData } from "@/types/character";
import { useSelection } from "./SelectionProvider";

export function SelectionCheckbox({ item }: { item: CharacterCardData }) {
  const t = useTranslations("Search");
  const { isSelected, toggle } = useSelection();
  const selected = isSelected(item.id);

  return (
    <input
      className="card__checkbox"
      type="checkbox"
      aria-label={t("select", { name: item.name })}
      checked={selected}
      onChange={() => toggle(item)}
    />
  );
}
