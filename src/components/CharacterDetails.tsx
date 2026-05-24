import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchCharacterDetails } from "../api/charactersApi";
import type { CharacterDetailsData } from "../types/character";
import { Button } from "../ui/Button";
import { Loader } from "../ui/Loader";

export function CharacterDetails(): React.ReactNode {
  const { detailsId } = useParams();
  const detailsIdNumber = Number(detailsId);
  const hasValidId = Number.isInteger(detailsIdNumber) && detailsIdNumber > 0;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<CharacterDetailsData | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(hasValidId);
  const [errorMessage, setErrorMessage] = useState(
    hasValidId ? "" : "Character not found",
  );

  useEffect(() => {
    if (!hasValidId) {
      return;
    }

    const loadCharacterDetails = async (): Promise<void> => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const result = await fetchCharacterDetails(detailsIdNumber);

        setCharacter(result);
        setIsLoading(false);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Unknown error occurred while loading details";

        setCharacter(null);
        setIsLoading(false);
        setErrorMessage(message);
      }
    };

    void loadCharacterDetails();
  }, [detailsIdNumber, hasValidId]);

  const handleClose = (): void => {
    navigate({
      pathname: "/",
      search: searchParams.toString(),
    });
  };

  const renderContent = (): React.ReactNode => {
    if (isLoading) {
      return <Loader />;
    }

    if (errorMessage.length > 0) {
      return <p className="message error-message">{errorMessage}</p>;
    }

    if (character === null) {
      return null;
    }

    return (
      <>
        <img
          className="details-panel__image"
          src={character.image}
          alt={character.name}
        />
        <h2>{character.name}</h2>
        <dl className="details-panel__list">
          <div>
            <dt>Status</dt>
            <dd>{character.status}</dd>
          </div>
          <div>
            <dt>Species</dt>
            <dd>{character.species}</dd>
          </div>
          <div>
            <dt>Gender</dt>
            <dd>{character.gender}</dd>
          </div>
          <div>
            <dt>Origin</dt>
            <dd>{character.origin}</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{character.location}</dd>
          </div>
        </dl>
      </>
    );
  };

  return (
    <section
      className="details-panel-backdrop"
      aria-label="Details backdrop"
      onClick={handleClose}
    >
      <aside
        className="details-panel"
        aria-label="Character details"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <Button
          className="details-panel__close"
          aria-label="Close details"
          onClick={handleClose}
        >
          x
        </Button>
        {renderContent()}
      </aside>
    </section>
  );
}
