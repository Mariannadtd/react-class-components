import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { SelectedItemsFlyout } from "@/components/SelectedItemsFlyout";
import { SelectionProvider } from "@/components/SelectionProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider>
        <SelectionProvider>
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          {children}
          <SelectedItemsFlyout />
        </SelectionProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
