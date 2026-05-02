import { Component } from "react";
import type { CharacterCard } from "../types/character";

interface CardProps {
  item: CharacterCard;
}

export class Card extends Component<CardProps> {
  render(): React.ReactNode {
    return (
      <li className="card">
        <img
          className="card__image"
          src={this.props.item.image}
          alt={this.props.item.name}
        />

        <div className="card__content">
          <h3>{this.props.item.name}</h3>
          <p>{this.props.item.description}</p>
        </div>
      </li>
    );
  }
}
