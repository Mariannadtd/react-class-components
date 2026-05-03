import { Component } from "react";
import { fetchCharacters } from "../api/charactersApi";
import type { CharacterCard } from "../types/character";
import { Header } from "./Header";
import { Main } from "./Main";
import { ErrorBoundary } from "./ErrorBoundary";

interface AppState {
  items: CharacterCard[];
  isLoading: boolean;
  errorMessage: string;
  currentSearchTerm: string;
}

export class App extends Component<object, AppState> {
  state: AppState = {
    items: [],
    isLoading: false,
    errorMessage: "",
    currentSearchTerm: "",
  };

  handleInitialSearch = (searchTerm: string): void => {
    this.setState(
      {
        currentSearchTerm: searchTerm,
      },
      () => {
        void this.loadCharacters(searchTerm);
      },
    );
  };

  handleSearch = (searchTerm: string): void => {
    const trimmedSearchTerm = searchTerm.trim();

    if (trimmedSearchTerm === this.state.currentSearchTerm) {
      return;
    }

    localStorage.setItem("searchTerm", trimmedSearchTerm);

    this.setState(
      {
        currentSearchTerm: trimmedSearchTerm,
      },
      () => {
        void this.loadCharacters(trimmedSearchTerm);
      },
    );
  };

  loadCharacters = async (searchTerm: string): Promise<void> => {
    this.setState({
      isLoading: true,
      errorMessage: "",
    });

    try {
      const items = await fetchCharacters(searchTerm);

      this.setState({
        items,
        isLoading: false,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unknown error occurred while loading data";

      this.setState({
        items: [],
        isLoading: false,
        errorMessage: message,
      });
    }
  };

  render(): React.ReactNode {
    return (
      <ErrorBoundary>
        <Header />
        <Main
          items={this.state.items}
          isLoading={this.state.isLoading}
          errorMessage={this.state.errorMessage}
          onInitialSearch={this.handleInitialSearch}
          onSearch={this.handleSearch}
        />
      </ErrorBoundary>
    );
  }
}
