import { getTranslations, setRequestLocale } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";

export const dynamic = "force-static";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");

  return (
    <main className="page about-page">
      <p className="eyebrow">Next.js · App Router · SSR</p>
      <h2>{t("title")}</h2>
      <p>{t("description")}</p>
      <a
        className="external-link"
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noreferrer"
      >
        {t("course")}
      </a>
    </main>
  );
}
