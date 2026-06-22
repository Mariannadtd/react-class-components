"use server";

import { redirect } from "next/navigation";
import type { AppLocale } from "@/i18n/routing";

const normalizeLocale = (value: FormDataEntryValue | null): AppLocale =>
  value === "ru" ? "ru" : "en";

export async function searchCharacters(formData: FormData): Promise<never> {
  const locale = normalizeLocale(formData.get("locale"));
  const value = formData.get("q");
  const query = typeof value === "string" ? value.trim().slice(0, 100) : "";
  const params = new URLSearchParams({ page: "1" });

  if (query) {
    params.set("q", query);
  }

  redirect(`/${locale}?${params}`);
}
