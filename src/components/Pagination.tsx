interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps): React.ReactNode {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="pagination" aria-label="Pagination">
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={page === currentPage ? "active" : ""}
          onClick={() => {
            onPageChange(page);
          }}
        >
          {page}
        </button>
      ))}
    </nav>
  );
}
