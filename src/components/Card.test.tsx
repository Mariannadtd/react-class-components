import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card } from "./Card";
import { MemoryRouter } from "react-router-dom";

const character = {
  id: 1,
  name: "Rick Sanchez",
  description: "Human, Alive, Male. Origin: Earth",
  image: "https://example.com/rick.png",
};

describe("Card", () => {
  it("renders character content", () => {
    render(
      <MemoryRouter>
        <Card item={character} />
      </MemoryRouter>,
    );

    const image = screen.getByRole("img", { name: /rick sanchez/i });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", character.image);

    expect(
      screen.getByRole("heading", { name: /rick sanchez/i }),
    ).toBeInTheDocument();

    expect(screen.getByText(character.description)).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /rick sanchez/i })).toHaveAttribute(
      "href",
      "/details/1",
    );
  });
});
