"use client";

import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { useTheme } from "./ThemeProvider";

export function Header() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { theme, setTheme } = useTheme();

  const switchLocale = (nextLocale: AppLocale): void => {
    const query = searchParams.toString();
    const href = query ? `${pathname}?${query}` : pathname;

    startTransition(() => {
      router.replace(href, { locale: nextLocale });
    });
  };

  return (
    <header className="header">
      <div className="header__top">
        <div>
          <h1>{t("title")}</h1>
          <p>{t("subtitle")}</p>
        </div>

        <div className="header__controls">
          <div className="segmented" aria-label={t("theme")}>
            <button
              type="button"
              className={theme === "light" ? "active" : undefined}
              aria-pressed={theme === "light"}
              onClick={() => setTheme("light")}
            >
              {t("light")}
            </button>
            <button
              type="button"
              className={theme === "dark" ? "active" : undefined}
              aria-pressed={theme === "dark"}
              onClick={() => setTheme("dark")}
            >
              {t("dark")}
            </button>
          </div>

          <label className="language-switcher">
            <span>{t("language")}</span>
            <select
              value={locale}
              disabled={isPending}
              onChange={(event) =>
                switchLocale(event.target.value === "ru" ? "ru" : "en")
              }
            >
              <option value="en">English</option>
              <option value="ru">Русский</option>
            </select>
          </label>
        </div>
      </div>

      <nav className="navigation" aria-label="Main navigation">
        <Link href="/">{t("home")}</Link>
        <Link href="/about">{t("about")}</Link>
      </nav>
    </header>
  );
}
