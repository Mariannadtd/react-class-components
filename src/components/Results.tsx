import type { CharacterCard } from "../types/character";
import { Card } from "./Card";
import { Loader } from "../ui/Loader";

interface ResultsProps {
  items: CharacterCard[];
  isLoading: boolean;
  errorMessage: string;
}

export function Results({
  items,
  isLoading,
  errorMessage,
}: ResultsProps): React.ReactNode {
  const renderContent = (): React.ReactNode => {
    if (isLoading) {
      return <Loader />;
    }

    if (errorMessage.length > 0) {
      return <p className="message error-message">{errorMessage}</p>;
    }

    if (items.length === 0) {
      return <p className="message">No results found.</p>;
    }

    return (
      <ul className="card-list">
        {items.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </ul>
    );
  };

  return <>{renderContent()}</>;
}
