import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "./Header";

describe("Header", () => {
  it("renders title and subtitle", () => {
    render(<Header />);

    expect(
      screen.getByRole("heading", { name: /character search/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/search rick and morty characters/i),
    ).toBeInTheDocument();
  });
});
