import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Search } from "./Search";

describe("Search", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders search input and button", () => {
    render(<Search onInitialSearch={vi.fn()} onSearch={vi.fn()} />);
    expect(
      screen.getByRole("searchbox", { name: /search character/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("empty input when localStorage is empty", () => {
    render(<Search onInitialSearch={vi.fn()} onSearch={vi.fn()} />);
    expect(
      screen.getByRole("searchbox", { name: /search character/i }),
    ).toHaveValue("");
  });

  it("shows saved search term from localStorage", () => {
    localStorage.setItem("searchTerm", "Rick");
    render(<Search onInitialSearch={vi.fn()} onSearch={vi.fn()} />);
    expect(
      screen.getByRole("searchbox", { name: /search character/i }),
    ).toHaveValue("Rick");
  });

  it("updates input value when user types", async () => {
    const user = userEvent.setup();
    render(<Search onInitialSearch={vi.fn()} onSearch={vi.fn()} />);
    const input = screen.getByRole("searchbox", {
      name: /search character/i,
    });
    await user.type(input, "Morty");
    expect(input).toHaveValue("Morty");
  });

  it("calls onSearch with trimmed value when form is submitted", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<Search onInitialSearch={vi.fn()} onSearch={onSearch} />);
    const input = screen.getByRole("searchbox", {
      name: /search character/i,
    });
    await user.type(input, "  Morty  ");
    await user.click(screen.getByRole("button", { name: /search/i }));
    expect(onSearch).toHaveBeenCalledWith("Morty");
    expect(input).toHaveValue("Morty");
  });

  it("calls onSearch with trimmed value when form is submitted", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<Search onInitialSearch={vi.fn()} onSearch={onSearch} />);
    const input = screen.getByRole("searchbox", {
      name: /search character/i,
    });
    await user.type(input, "  Morty  ");
    await user.click(screen.getByRole("button", { name: /search/i }));
    expect(onSearch).toHaveBeenCalledWith("Morty");
    expect(input).toHaveValue("Morty");
  });

  it("calls onInitialSearch with trimmed saved search term", () => {
    localStorage.setItem("searchTerm", "  Rick  ");
    const onInitialSearch = vi.fn();
    render(<Search onInitialSearch={onInitialSearch} onSearch={vi.fn()} />);
    expect(onInitialSearch).toHaveBeenCalledWith("Rick");
  });
});
