import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  charactersQueryKeys,
  useCharacterDetailsQuery,
} from "../api/charactersQueries";
import { Button } from "../ui/Button";
import { Loader } from "../ui/Loader";

export function CharacterDetails(): React.ReactNode {
  const { detailsId } = useParams();
  const detailsIdNumber = Number(detailsId);
  const hasValidId = Number.isInteger(detailsIdNumber) && detailsIdNumber > 0;
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const characterQuery = useCharacterDetailsQuery(detailsIdNumber, hasValidId);

  const handleClose = (): void => {
    navigate({
      pathname: "/",
      search: searchParams.toString(),
    });
  };

  const handleRefresh = (): void => {
    if (!hasValidId) {
      return;
    }

    void queryClient.invalidateQueries({
      queryKey: charactersQueryKeys.detail(detailsIdNumber),
    });
  };

  const renderContent = (): React.ReactNode => {
    if (!hasValidId) {
      return <p className="message error-message">Character not found</p>;
    }

    if (characterQuery.isLoading) {
      return <Loader />;
    }

    if (characterQuery.error instanceof Error) {
      return (
        <p className="message error-message">{characterQuery.error.message}</p>
      );
    }

    if (characterQuery.data === undefined) {
      return null;
    }

    return (
      <>
        <img
          className="details-panel__image"
          src={characterQuery.data.image}
          alt={characterQuery.data.name}
        />
        <h2>{characterQuery.data.name}</h2>
        <dl className="details-panel__list">
          <div>
            <dt>Status</dt>
            <dd>{characterQuery.data.status}</dd>
          </div>
          <div>
            <dt>Species</dt>
            <dd>{characterQuery.data.species}</dd>
          </div>
          <div>
            <dt>Gender</dt>
            <dd>{characterQuery.data.gender}</dd>
          </div>
          <div>
            <dt>Origin</dt>
            <dd>{characterQuery.data.origin}</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{characterQuery.data.location}</dd>
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
        <div className="details-panel__actions">
          <Button
            type="button"
            onClick={handleRefresh}
            disabled={!hasValidId || characterQuery.isFetching}
          >
            {characterQuery.isFetching ? "Refreshing..." : "Refresh"}
          </Button>

          <Button
            className="details-panel__close"
            aria-label="Close details"
            onClick={handleClose}
          >
            x
          </Button>
        </div>

        {renderContent()}
      </aside>
    </section>
  );
}
