import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { buildSearchQuery } from "@/lib/search-params";
import type { CharacterCardData } from "@/types/character";
import { SelectionCheckbox } from "./SelectionCheckbox";

export function CharacterCard({
  item,
  query,
  page,
}: {
  item: CharacterCardData;
  query: string;
  page: number;
}) {
  return (
    <li className="card">
      <SelectionCheckbox item={item} />
      <Link
        className="card__link"
        href={{
          pathname: "/",
          query: buildSearchQuery(query, page, item.id),
        }}
      >
        <Image
          className="card__image"
          src={item.image}
          alt={item.name}
          width={300}
          height={300}
          sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 260px"
        />
        <div className="card__content">
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </div>
      </Link>
    </li>
  );
}
