import { Outlet } from "react-router-dom";
import { ThemeProvider } from "../context/ThemeContext";
import { ErrorBoundary } from "./ErrorBoundary";
import { Header } from "./Header";
import { SelectedItemsFlyout } from "./SelectedItemsFlyout";

export function App(): React.ReactNode {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Header />
        <Outlet />
        <SelectedItemsFlyout />
      </ThemeProvider>
    </ErrorBoundary>
  );
}
