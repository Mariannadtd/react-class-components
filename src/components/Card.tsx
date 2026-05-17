import { Link, useLocation } from "react-router-dom";
import type { CharacterCard } from "../types/character";

interface CardProps {
  item: CharacterCard;
}

export function Card({ item }: CardProps): React.ReactNode {
  const location = useLocation();

  return (
    <li className="card">
      <Link className="card__link" to={`/details/${item.id}${location.search}`}>
        <img className="card__image" src={item.image} alt={item.name} />

        <div className="card__content">
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </div>
      </Link>
    </li>
  );
}
