import { getTranslations, setRequestLocale } from "next-intl/server";
import { CharacterCard } from "@/components/CharacterCard";
import { CharacterDetails } from "@/components/CharacterDetails";
import { Pagination } from "@/components/Pagination";
import { SearchForm } from "@/components/SearchForm";
import type { AppLocale } from "@/i18n/routing";
import { fetchCharacters } from "@/lib/characters";
import {
  getPositiveInteger,
  getQuery,
  type CharacterSearchParams,
} from "@/lib/search-params";

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: AppLocale }>;
  searchParams: Promise<CharacterSearchParams>;
}) {
  const [{ locale }, rawSearchParams] = await Promise.all([
    params,
    searchParams,
  ]);
  setRequestLocale(locale);

  const query = getQuery(rawSearchParams.q);
  const page = getPositiveInteger(rawSearchParams.page, 1);
  const selectedId = getPositiveInteger(rawSearchParams.selected, 0);
  const t = await getTranslations("Search");

  let result;
  let hasError = false;

  try {
    result = await fetchCharacters(query, page);
  } catch {
    result = { items: [], totalPages: 0 };
    hasError = true;
  }

  return (
    <main className={`split-view${selectedId ? " split-view--open" : ""}`}>
      <div className="master-panel">
        <section className="search-section">
          <SearchForm locale={locale} query={query} />
        </section>

        <section className="results-section">
          <h2>{t("results")}</h2>

          {hasError ? (
            <p className="message error-message">{t("error")}</p>
          ) : result.items.length === 0 ? (
            <p className="message">{t("empty")}</p>
          ) : (
            <ul className="card-list">
              {result.items.map((item) => (
                <CharacterCard
                  key={item.id}
                  item={item}
                  query={query}
                  page={page}
                />
              ))}
            </ul>
          )}

          <Pagination
            currentPage={page}
            totalPages={result.totalPages}
            query={query}
          />
        </section>
      </div>

      <aside
        className={`details-panel-shell${selectedId ? "" : " details-panel-shell--empty"}`}
        aria-label={t("results")}
      >
        {selectedId > 0 && (
          <CharacterDetails id={selectedId} query={query} page={page} />
        )}
      </aside>
    </main>
  );
}
