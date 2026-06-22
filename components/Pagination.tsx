import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buildSearchQuery } from "@/lib/search-params";

const getVisiblePages = (currentPage: number, totalPages: number): number[] => {
  const start = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
  const end = Math.min(totalPages, start + 4);
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

export async function Pagination({
  currentPage,
  totalPages,
  query,
}: {
  currentPage: number;
  totalPages: number;
  query: string;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const t = await getTranslations("Search");
  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <nav className="pagination" aria-label="Pagination">
      {currentPage > 1 && (
        <Link
          href={{
            pathname: "/",
            query: buildSearchQuery(query, currentPage - 1),
          }}
        >
          {t("previous")}
        </Link>
      )}
      {pages.map((page) => (
        <Link
          key={page}
          className={page === currentPage ? "active" : undefined}
          aria-current={page === currentPage ? "page" : undefined}
          aria-label={t("page", { page })}
          href={{ pathname: "/", query: buildSearchQuery(query, page) }}
        >
          {page}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link
          href={{
            pathname: "/",
            query: buildSearchQuery(query, currentPage + 1),
          }}
        >
          {t("next")}
        </Link>
      )}
    </nav>
  );
}
