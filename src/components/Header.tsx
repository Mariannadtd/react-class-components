import { NavLink } from "react-router-dom";
import { useTheme } from "../context/useTheme";
import { Button } from "../ui/Button";

export function Header(): React.ReactNode {
  const { theme, setTheme } = useTheme();

  return (
    <header className="header">
      <div className="header__top">
        <div>
          <h1>Character Search</h1>
          <p>Search Rick and Morty characters</p>
        </div>

        <div className="theme-switcher" aria-label="Theme selection">
          <Button
            isActive={theme === "light"}
            aria-pressed={theme === "light"}
            onClick={() => {
              setTheme("light");
            }}
          >
            Light
          </Button>

          <Button
            isActive={theme === "dark"}
            aria-pressed={theme === "dark"}
            onClick={() => {
              setTheme("dark");
            }}
          >
            Dark
          </Button>
        </div>
      </div>

      <nav className="navigation" aria-label="Main navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  );
}
