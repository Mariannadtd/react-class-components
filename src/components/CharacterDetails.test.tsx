import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fetchCharacterDetails } from "../api/charactersApi";
import { CharacterDetails } from "./CharacterDetails";

vi.mock("../api/charactersApi", () => ({
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

const renderDetailsRoute = (): void => {
  render(
    <MemoryRouter initialEntries={["/details/1?page=2"]}>
      <Routes>
        <Route path="/" element={<p>Home route</p>} />
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
    vi.mocked(fetchCharacterDetails).mockReturnValue(new Promise(() => {}));

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

  it("closes details panel", async () => {
    const user = userEvent.setup();
    vi.mocked(fetchCharacterDetails).mockResolvedValue(characterDetails);

    renderDetailsRoute();

    await user.click(
      await screen.findByRole("button", { name: /close details/i }),
    );

    expect(await screen.findByText(/home route/i)).toBeInTheDocument();
  });
});
