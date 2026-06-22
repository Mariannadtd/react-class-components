"use client";

import { useTranslations } from "next-intl";

export default function ErrorPage({ reset }: { reset: () => void }) {
  const t = useTranslations("Error");

  return (
    <main className="page state-page">
      <h2>{t("title")}</h2>
      <button type="button" className="button" onClick={reset}>
        {t("retry")}
      </button>
    </main>
  );
}
