import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ErrorBoundary } from "./ErrorBoundary";

const BrokenComponent = () => {
  throw new Error("Test error");
};

describe("ErrorBoundary", () => {
  it("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <p>App content</p>
      </ErrorBoundary>,
    );
    expect(screen.getByText(/app content/i)).toBeInTheDocument();
  });

  it("shows fallback UI when child throws error", () => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>,
    );
    expect(
      screen.getByRole("heading", { name: /something went wrong/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/the application caught an unexpected error/i),
    ).toBeInTheDocument();
    vi.restoreAllMocks();
  });
});
