import { Component } from "react";
import type { CharacterCard } from "../types/character";

interface CardProps {
  item: CharacterCard;
}

export class Card extends Component<CardProps> {
  render(): React.ReactNode {
    return (
      <li className="card">
        <h3>{this.props.item.name}</h3>
        <p>{this.props.item.description}</p>
      </li>
    );
  }
}
