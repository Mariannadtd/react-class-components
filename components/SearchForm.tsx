import { getTranslations } from "next-intl/server";
import { searchCharacters } from "@/app/actions";
import type { AppLocale } from "@/i18n/routing";

export async function SearchForm({
  locale,
  query,
}: {
  locale: AppLocale;
  query: string;
}) {
  const t = await getTranslations("Search");

  return (
    <form className="search-form" action={searchCharacters}>
      <input type="hidden" name="locale" value={locale} />
      <input
        type="search"
        name="q"
        defaultValue={query}
        maxLength={100}
        placeholder={t("placeholder")}
        aria-label={t("label")}
      />
      <button className="button" type="submit">
        {t("button")}
      </button>
    </form>
  );
}
