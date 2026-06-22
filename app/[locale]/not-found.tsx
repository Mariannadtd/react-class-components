import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function LocaleNotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main className="page state-page">
      <p className="state-code">404</p>
      <h2>{t("title")}</h2>
      <p>{t("description")}</p>
      <Link className="button" href="/">
        {t("home")}
      </Link>
    </main>
  );
}
