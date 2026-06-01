import { Button } from "../ui/Button";

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
        <Button
          key={page}
          isActive={page === currentPage}
          onClick={() => {
            onPageChange(page);
          }}
        >
          {page}
        </Button>
      ))}
    </nav>
  );
}
