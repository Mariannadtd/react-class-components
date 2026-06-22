"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { CharacterCardData } from "@/types/character";

interface SelectionContextValue {
  items: CharacterCardData[];
  isSelected: (id: number) => boolean;
  toggle: (item: CharacterCardData) => void;
  clear: () => void;
}

const SelectionContext = createContext<SelectionContextValue | null>(null);

export function SelectionProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CharacterCardData[]>([]);

  const value = useMemo<SelectionContextValue>(
    () => ({
      items,
      isSelected: (id) => items.some((item) => item.id === id),
      toggle: (item) => {
        setItems((current) =>
          current.some((selected) => selected.id === item.id)
            ? current.filter((selected) => selected.id !== item.id)
            : [...current, item],
        );
      },
      clear: () => setItems([]),
    }),
    [items],
  );

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection(): SelectionContextValue {
  const context = useContext(SelectionContext);

  if (!context) {
    throw new Error("useSelection must be used inside SelectionProvider");
  }

  return context;
}
