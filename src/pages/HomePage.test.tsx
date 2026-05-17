import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  fetchCharacterDetails,
  fetchCharacters,
} from "../api/charactersApi";
import { CharacterDetails } from "../components/CharacterDetails";
import { HomePage } from "./HomePage";

vi.mock("../api/charactersApi", () => ({
  fetchCharacters: vi.fn(),
  fetchCharacterDetails: vi.fn(),
}));

const renderHomePage = (initialEntry = "/"): void => {
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <HomePage />
    </MemoryRouter>,
  );
};

const renderHomePageWithDetailsRoute = (): void => {
  render(
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="details/:detailsId" element={<CharacterDetails />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
};

describe("HomePage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("shows characters after successful load", async () => {
    vi.mocked(fetchCharacters).mockResolvedValue({
      items: [
        {
          id: 1,
          name: "Rick Sanchez",
          description: "Human, Alive, Male. Origin: Earth",
          image: "https://example.com/rick.png",
        },
      ],
      totalPages: 1,
    });
    renderHomePage();
    expect(
      await screen.findByRole("heading", { name: /rick sanchez/i }),
    ).toBeInTheDocument();
  });

  it("shows error message when API fails", async () => {
    vi.mocked(fetchCharacters).mockRejectedValue(
      new Error("Request failed with status 500"),
    );
    renderHomePage();
    expect(
      await screen.findByText(/request failed with status 500/i),
    ).toBeInTheDocument();
  });

  it("saves search term to localStorage after search", async () => {
    const user = userEvent.setup();
    vi.mocked(fetchCharacters).mockResolvedValue({
      items: [],
      totalPages: 0,
    });
    renderHomePage();
    const input = screen.getByRole("searchbox", {
      name: /search character/i,
    });
    await user.type(input, "Morty");
    await user.click(screen.getByRole("button", { name: /search/i }));
    expect(localStorage.getItem("searchTerm")).toBe("Morty");
  });

  it("loads page from URL", async () => {
    vi.mocked(fetchCharacters).mockResolvedValue({
      items: [],
      totalPages: 3,
    });

    renderHomePage("/?page=2");

    expect(fetchCharacters).toHaveBeenCalledWith("", 2);

    expect(await screen.findByRole("button", { name: "2" })).toHaveClass(
      "active",
    );
  });

  it("loads another page after pagination click", async () => {
    const user = userEvent.setup();

    vi.mocked(fetchCharacters).mockResolvedValue({
      items: [],
      totalPages: 3,
    });

    renderHomePage();

    await user.click(await screen.findByRole("button", { name: "2" }));

    expect(fetchCharacters).toHaveBeenLastCalledWith("", 2);
  });

  it("resets visible page when user changes input", async () => {
    const user = userEvent.setup();

    vi.mocked(fetchCharacters).mockResolvedValue({
      items: [],
      totalPages: 3,
    });

    renderHomePage("/?page=2");

    await user.type(
      await screen.findByRole("searchbox", { name: /search character/i }),
      "R",
    );

    expect(screen.getByRole("button", { name: "1" })).toHaveClass("active");
  });

  it("opens character details and keeps results visible", async () => {
    const user = userEvent.setup();

    vi.mocked(fetchCharacters).mockResolvedValue({
      items: [
        {
          id: 1,
          name: "Rick Sanchez",
          description: "Human, Alive, Male. Origin: Earth",
          image: "https://example.com/rick.png",
        },
      ],
      totalPages: 1,
    });
    vi.mocked(fetchCharacterDetails).mockResolvedValue({
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "Male",
      image: "https://example.com/rick.png",
      origin: "Earth",
      location: "Citadel of Ricks",
    });

    renderHomePageWithDetailsRoute();

    await user.click(
      await screen.findByRole("link", { name: /rick sanchez/i }),
    );

    expect(
      screen.getByRole("heading", { name: /results/i }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("complementary", {
        name: /character details/i,
      }),
    ).toBeInTheDocument();
  });
});
