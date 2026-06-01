import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Link, MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchCharacterDetails } from "../api/charactersApi";
import { renderWithQueryClient } from "../test/renderWithQueryClient";
import { CharacterDetails } from "./CharacterDetails";

vi.mock("../api/charactersApi", () => ({
  fetchCharacters: vi.fn(),
  fetchCharacterDetails: vi.fn(),
}));

const characterDetails = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  image: "https://example.com/rick.png",
  origin: "Earth",
  location: "Citadel of Ricks",
};

const renderDetailsRoute = (initialEntry = "/details/1?page=2"): void => {
  renderWithQueryClient(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>
        <Route
          path="/"
          element={<Link to="/details/1?page=2">Open Rick</Link>}
        />
        <Route path="/details/:detailsId" element={<CharacterDetails />} />
      </Routes>
    </MemoryRouter>,
  );
};

describe("CharacterDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loader while details are loading", () => {
    vi.mocked(fetchCharacterDetails).mockReturnValue(
      new Promise<never>(() => {}),
    );

    renderDetailsRoute();

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders loaded character details", async () => {
    vi.mocked(fetchCharacterDetails).mockResolvedValue(characterDetails);

    renderDetailsRoute();

    expect(
      await screen.findByRole("heading", { name: /rick sanchez/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("Citadel of Ricks")).toBeInTheDocument();
  });

  it("shows details error message when API fails", async () => {
    vi.mocked(fetchCharacterDetails).mockRejectedValue(
      new Error("Unable to load character details. Please try again."),
    );

    renderDetailsRoute();

    expect(
      await screen.findByText(/unable to load character details/i),
    ).toBeInTheDocument();
  });

  it("closes details panel", async () => {
    const user = userEvent.setup();
    vi.mocked(fetchCharacterDetails).mockResolvedValue(characterDetails);

    renderDetailsRoute();

    await user.click(
      await screen.findByRole("button", { name: /close details/i }),
    );

    expect(
      await screen.findByRole("link", { name: /open rick/i }),
    ).toBeInTheDocument();
  });

  it("closes details panel when backdrop is clicked", async () => {
    const user = userEvent.setup();
    vi.mocked(fetchCharacterDetails).mockResolvedValue(characterDetails);

    renderDetailsRoute();

    await screen.findByRole("heading", { name: /rick sanchez/i });
    await user.click(screen.getByRole("region", { name: /details backdrop/i }));

    expect(
      await screen.findByRole("link", { name: /open rick/i }),
    ).toBeInTheDocument();
  });

  it("reuses cached details when the same character is opened again", async () => {
    const user = userEvent.setup();
    vi.mocked(fetchCharacterDetails).mockResolvedValue(characterDetails);

    renderDetailsRoute();

    await screen.findByRole("heading", { name: /rick sanchez/i });
    expect(fetchCharacterDetails).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole("button", { name: /close details/i }));
    await user.click(await screen.findByRole("link", { name: /open rick/i }));

    expect(
      await screen.findByRole("heading", { name: /rick sanchez/i }),
    ).toBeInTheDocument();
    expect(fetchCharacterDetails).toHaveBeenCalledTimes(1);
  });

  it("refreshes character details on demand", async () => {
    const user = userEvent.setup();
    vi.mocked(fetchCharacterDetails).mockResolvedValue(characterDetails);

    renderDetailsRoute();

    await screen.findByRole("heading", { name: /rick sanchez/i });
    await user.click(screen.getByRole("button", { name: /refresh/i }));

    await waitFor(() => {
      expect(fetchCharacterDetails).toHaveBeenCalledTimes(2);
    });
  });
});
