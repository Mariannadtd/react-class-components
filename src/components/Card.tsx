import { Link, useLocation } from "react-router-dom";
import { useSelectedItemsStore } from "../store/selectedItemsStore";
import type { CharacterCard } from "../types/character";

interface CardProps {
  item: CharacterCard;
}

export function Card({ item }: CardProps): React.ReactNode {
  const location = useLocation();
  const isSelected = useSelectedItemsStore((state) =>
    state.isSelected(item.id),
  );
  const toggleItem = useSelectedItemsStore((state) => state.toggleItem);

  return (
    <li className={`card ${isSelected ? "card--selected" : ""}`}>
      <input
        className="card__checkbox"
        type="checkbox"
        aria-label={`Select ${item.name}`}
        checked={isSelected}
        onClick={(event) => {
          event.stopPropagation();
        }}
        onChange={() => {
          toggleItem(item);
        }}
      />

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
