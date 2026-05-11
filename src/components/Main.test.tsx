import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Main } from "./Main";
import type { CharacterCard } from "../types/character";

const character: CharacterCard = {
  id: 1,
  name: "Rick Sanchez",
  description: "Human, Alive, Male. Origin: Earth",
  image: "https://example.com/rick.png",
};

describe("Main", () => {
  it("renders provided character cards", () => {
    render(
      <Main
        items={[character]}
        isLoading={false}
        errorMessage=""
        onInitialSearch={vi.fn()}
        onSearch={vi.fn()}
      />,
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
