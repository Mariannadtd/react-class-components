import { NavLink } from "react-router-dom";

export function Header(): React.ReactNode {
  return (
    <header className="header">
      <h1>Character Search</h1>
      <p>Search Rick and Morty characters</p>

      <nav className="navigation" aria-label="Main navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  );
}
