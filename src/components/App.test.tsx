import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchCharacters } from "../api/charactersApi";
import { App } from "./App";

vi.mock("../api/charactersApi", () => ({
  fetchCharacters: vi.fn(),
}));
describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("shows characters after successful load", async () => {
    vi.mocked(fetchCharacters).mockResolvedValue([
      {
        id: 1,
        name: "Rick Sanchez",
        description: "Human, Alive, Male. Origin: Earth",
        image: "https://example.com/rick.png",
      },
    ]);
    render(<App />);
    expect(
      await screen.findByRole("heading", { name: /rick sanchez/i }),
    ).toBeInTheDocument();
  });

  it("shows error message when API fails", async () => {
    vi.mocked(fetchCharacters).mockRejectedValue(
      new Error("Request failed with status 500"),
    );
    render(<App />);
    expect(
      await screen.findByText(/request failed with status 500/i),
    ).toBeInTheDocument();
  });

  it("saves search term to localStorage after search", async () => {
    const user = userEvent.setup();
    vi.mocked(fetchCharacters).mockResolvedValue([]);
    render(<App />);
    const input = screen.getByRole("searchbox", {
      name: /search character/i,
    });
    await user.type(input, "Morty");
    await user.click(screen.getByRole("button", { name: /search/i }));
    expect(localStorage.getItem("searchTerm")).toBe("Morty");
  });
});
