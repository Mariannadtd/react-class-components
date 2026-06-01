import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../context/ThemeContext";
import { Header } from "./Header";

const renderHeader = (): void => {
  render(
    <MemoryRouter>
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    </MemoryRouter>,
  );
};

describe("Header", () => {
  afterEach(() => {
    delete document.documentElement.dataset.theme;
  });

  it("renders title and subtitle", () => {
    renderHeader();

    expect(
      screen.getByRole("heading", { name: /character search/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/search rick and morty characters/i),
    ).toBeInTheDocument();
  });

  it("switches the document theme", async () => {
    const user = userEvent.setup();

    renderHeader();

    expect(document.documentElement).toHaveAttribute("data-theme", "light");

    await user.click(screen.getByRole("button", { name: /dark/i }));

    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  });
});
