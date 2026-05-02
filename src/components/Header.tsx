import { Component } from "react";

export class Header extends Component {
  render(): React.ReactNode {
    return (
      <header className="header">
        <h1>Character Search</h1>
        <p>Search Rick and Morty characters</p>
      </header>
    );
  }
}
