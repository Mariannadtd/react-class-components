import { type ChangeEvent, type FormEvent, useEffect, useRef } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface SearchProps {
  onInitialSearch: (searchTerm: string) => void;
  onSearchTermChange: () => void;
  onSearch: (searchTerm: string) => void;
}

export function Search({
  onInitialSearch,
  onSearchTermChange,
  onSearch,
}: SearchProps): React.ReactNode {
  const [searchTerm, setSearchTerm] = useLocalStorage("searchTerm", "");
  const hasInitialSearchRun = useRef(false);

  useEffect(() => {
    if (hasInitialSearchRun.current) {
      return;
    }

    onInitialSearch(searchTerm.trim());
    hasInitialSearchRun.current = true;
  }, [onInitialSearch, searchTerm]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
    onSearchTermChange();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const trimmedSearchTerm = searchTerm.trim();

    setSearchTerm(trimmedSearchTerm);
    onSearch(trimmedSearchTerm);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="search"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Enter character name"
        aria-label="Search character"
      />

      <button type="submit">Search</button>
    </form>
  );
}
