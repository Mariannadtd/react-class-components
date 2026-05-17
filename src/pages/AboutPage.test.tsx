import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AboutPage } from "./AboutPage";

describe("AboutPage", () => {
  it("shows author information and course link", () => {
    render(<AboutPage />);

    expect(screen.getByText(/created by marianna/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /rs school react course/i }),
    ).toBeInTheDocument();
  });
});
