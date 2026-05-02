import { Component, type ChangeEvent, type FormEvent } from "react";

interface SearchProps {
  onInitialSearch: (searchTerm: string) => void;
  onSearch: (searchTerm: string) => void;
}

interface SearchState {
  searchTerm: string;
}

export class Search extends Component<SearchProps, SearchState> {
  state: SearchState = {
    searchTerm: "",
  };

  componentDidMount(): void {
    const savedSearchTerm = localStorage.getItem("searchTerm") ?? "";

    this.setState({
      searchTerm: savedSearchTerm,
    });

    this.props.onInitialSearch(savedSearchTerm.trim());
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      searchTerm: event.target.value,
    });
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const trimmedSearchTerm = this.state.searchTerm.trim();

    this.setState({
      searchTerm: trimmedSearchTerm,
    });

    this.props.onSearch(trimmedSearchTerm);
  };

  render(): React.ReactNode {
    return (
      <form className="search-form" onSubmit={this.handleSubmit}>
        <input
          type="search"
          value={this.state.searchTerm}
          onChange={this.handleChange}
          placeholder="Enter character name"
          aria-label="Search character"
        />

        <button type="submit">Search</button>
      </form>
    );
  }
}
