import { Link } from "react-router-dom";

export function NotFoundPage(): React.ReactNode {
  return (
    <main className="page">
      <h2>Page not found</h2>
      <Link to="/">Return to home</Link>
    </main>
  );
}
