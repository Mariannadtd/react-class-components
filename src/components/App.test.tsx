import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("App", () => {
  it("renders shared layout and nested page", () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<p>Home page</p>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: /character search/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/home page/i)).toBeInTheDocument();
  });
});
