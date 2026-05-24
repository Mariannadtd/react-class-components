import { create } from "zustand";
import type { CharacterCard } from "../types/character";

interface SelectedItemsState {
  selectedItems: CharacterCard[];
  isSelected: (id: number) => boolean;
  toggleItem: (item: CharacterCard) => void;
  clearSelectedItems: () => void;
}

export const useSelectedItemsStore = create<SelectedItemsState>((set, get) => ({
  selectedItems: [],

  isSelected: (id: number) =>
    get().selectedItems.some((item) => item.id === id),

  toggleItem: (item: CharacterCard) => {
    const selectedItems = get().selectedItems;
    const itemIsSelected = selectedItems.some(
      (selectedItem) => selectedItem.id === item.id,
    );

    set({
      selectedItems: itemIsSelected
        ? selectedItems.filter((selectedItem) => selectedItem.id !== item.id)
        : [...selectedItems, item],
    });
  },

  clearSelectedItems: () => {
    set({ selectedItems: [] });
  },
}));
