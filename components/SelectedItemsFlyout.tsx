"use client";

import { useTranslations } from "next-intl";
import { useSelection } from "./SelectionProvider";

export function SelectedItemsFlyout() {
  const t = useTranslations("Selection");
  const { items, clear } = useSelection();

  if (items.length === 0) {
    return null;
  }

  return (
    <aside className="selected-flyout" aria-live="polite">
      <p>{t("count", { count: items.length })}</p>
      <div className="selected-flyout__actions">
        <button type="button" className="button button--quiet" onClick={clear}>
          {t("clear")}
        </button>
        <form action="/api/csv" method="post">
          <input type="hidden" name="items" value={JSON.stringify(items)} />
          <button type="submit" className="button">
            {t("download")}
          </button>
        </form>
      </div>
    </aside>
  );
}
