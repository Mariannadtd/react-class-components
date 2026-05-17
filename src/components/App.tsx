import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "./ErrorBoundary";
import { Header } from "./Header";

export function App(): React.ReactNode {
  return (
    <ErrorBoundary>
      <Header />
      <Outlet />
    </ErrorBoundary>
  );
}
