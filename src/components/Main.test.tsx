import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Main } from "./Main";
import type { CharacterCard } from "../types/character";
import { MemoryRouter } from "react-router-dom";

const character: CharacterCard = {
  id: 1,
  name: "Rick Sanchez",
  description: "Human, Alive, Male. Origin: Earth",
  image: "https://example.com/rick.png",
};

describe("Main", () => {
  it("renders provided character cards", () => {
    render(
      <MemoryRouter>
        <Main
          items={[character]}
          isLoading={false}
          isRefreshing={false}
          errorMessage=""
          onInitialSearch={vi.fn()}
          onSearchTermChange={vi.fn()}
          onSearch={vi.fn()}
          currentPage={1}
          totalPages={1}
          onPageChange={vi.fn()}
          onRefresh={vi.fn()}
        />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: /rick sanchez/i }),
    ).toBeInTheDocument();

    expect(screen.getByRole("img", { name: /rick sanchez/i })).toHaveAttribute(
      "src",
      character.image,
    );
  });
});
