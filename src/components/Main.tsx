import { Component } from "react";
import type { CharacterCard } from "../types/character";
import { Search } from "./Search";
import { Results } from "./Results";
import { ErrorButton } from "./ErrorButton";

interface MainProps {
  items: CharacterCard[];
  isLoading: boolean;
  errorMessage: string;
  onInitialSearch: (searchTerm: string) => void;
  onSearch: (searchTerm: string) => void;
}

export class Main extends Component<MainProps> {
  render(): React.ReactNode {
    return (
      <main className="layout">
        <section className="search-section">
          <Search
            onInitialSearch={this.props.onInitialSearch}
            onSearch={this.props.onSearch}
          />
        </section>

        <section className="results-section">
          <Results
            items={this.props.items}
            isLoading={this.props.isLoading}
            errorMessage={this.props.errorMessage}
          />
        </section>

        <ErrorButton />
      </main>
    );
  }
}
