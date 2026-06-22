import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { fetchCharacterDetails } from "@/lib/characters";
import { buildSearchQuery } from "@/lib/search-params";

export async function CharacterDetails({
  id,
  query,
  page,
}: {
  id: number;
  query: string;
  page: number;
}) {
  const [character, t] = await Promise.all([
    fetchCharacterDetails(id),
    getTranslations("Details"),
  ]);

  if (!character) {
    return <p className="message error-message">{t("notFound")}</p>;
  }

  return (
    <>
      <Link
        className="details-panel__close"
        aria-label={t("close")}
        href={{ pathname: "/", query: buildSearchQuery(query, page) }}
      >
        ×
      </Link>
      <Image
        className="details-panel__image"
        src={character.image}
        alt={character.name}
        width={300}
        height={300}
        sizes="320px"
        priority
      />
      <h2>{character.name}</h2>
      <dl className="details-panel__list">
        <div><dt>{t("status")}</dt><dd>{character.status}</dd></div>
        <div><dt>{t("species")}</dt><dd>{character.species}</dd></div>
        <div><dt>{t("gender")}</dt><dd>{character.gender}</dd></div>
        <div><dt>{t("origin")}</dt><dd>{character.origin}</dd></div>
        <div><dt>{t("location")}</dt><dd>{character.location}</dd></div>
      </dl>
    </>
  );
}
