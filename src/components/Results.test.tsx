import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Results } from "./Results";

const characters = [
  {
    id: 1,
    name: "Rick Sanchez",
    description: "Human, Alive, Male. Origin: Earth",
    image: "https://example.com/rick.png",
  },
  {
    id: 2,
    name: "Morty Smith",
    description: "Human, Alive, Male. Origin: Earth",
    image: "https://example.com/morty.png",
  },
];

describe("Results", () => {
  it("renders results heading", () => {
    render(<Results items={[]} isLoading={false} errorMessage="" />);

    expect(
      screen.getByRole("heading", { name: /results/i }),
    ).toBeInTheDocument();
  });

  it("shows no results message when items list is empty", () => {
    render(<Results items={[]} isLoading={false} errorMessage="" />);
    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
  });

  it("shows loader when loading", () => {
    render(<Results items={[]} isLoading={true} errorMessage="" />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("shows error message when errorMessage is provided", () => {
    render(
      <Results
        items={[]}
        isLoading={false}
        errorMessage="Request failed with status 500"
      />,
    );

    expect(
      screen.getByText(/request failed with status 500/i),
    ).toBeInTheDocument();
  });

  it("renders character cards when items are provided", () => {
    render(<Results items={characters} isLoading={false} errorMessage="" />);
    expect(
      screen.getByRole("heading", { name: /rick sanchez/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /morty smith/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("shows loader when loading", () => {
    render(<Results items={[]} isLoading={true} errorMessage="" />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("shows error message when errorMessage is provided", () => {
    render(
      <Results
        items={[]}
        isLoading={false}
        errorMessage="Request failed with status 500"
      />,
    );
    expect(
      screen.getByText(/request failed with status 500/i),
    ).toBeInTheDocument();
  });

  it("renders character cards when items are provided", () => {
    render(<Results items={characters} isLoading={false} errorMessage="" />);
    expect(
      screen.getByRole("heading", { name: /rick sanchez/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /morty smith/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
