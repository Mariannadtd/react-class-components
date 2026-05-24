import { useSelectedItemsStore } from "../store/selectedItemsStore";
import { downloadSelectedItemsCsv } from "../utils/selectedItemsCsv";
import { Button } from "../ui/Button";

export function SelectedItemsFlyout(): React.ReactNode {
  const selectedItems = useSelectedItemsStore((state) => state.selectedItems);
  const clearSelectedItems = useSelectedItemsStore(
    (state) => state.clearSelectedItems,
  );

  if (selectedItems.length === 0) {
    return null;
  }

  const selectedItemsText =
    selectedItems.length === 1
      ? "1 selected item"
      : `${selectedItems.length} selected items`;

  return (
    <aside className="selected-flyout" aria-live="polite">
      <p>{selectedItemsText}</p>

      <div className="selected-flyout__actions">
        <Button onClick={clearSelectedItems}>
          Unselect all
        </Button>

        <Button
          onClick={() => {
            downloadSelectedItemsCsv(selectedItems);
          }}
        >
          Download
        </Button>
      </div>
    </aside>
  );
}
