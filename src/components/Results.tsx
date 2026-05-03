import { Component } from "react";
import type { CharacterCard } from "../types/character";
import { Card } from "./Card";
import { Loader } from "./Loader";

interface ResultsProps {
  items: CharacterCard[];
  isLoading: boolean;
  errorMessage: string;
}

export class Results extends Component<ResultsProps> {
  renderContent(): React.ReactNode {
    if (this.props.isLoading) {
      return <Loader />;
    }

    if (this.props.errorMessage.length > 0) {
      return <p className="message error-message">{this.props.errorMessage}</p>;
    }

    if (this.props.items.length === 0) {
      return <p className="message">No results found.</p>;
    }

    return (
      <ul className="card-list">
        {this.props.items.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </ul>
    );
  }

  render(): React.ReactNode {
    return (
      <>
        <h2>Results</h2>
        {this.renderContent()}
      </>
    );
  }
}
