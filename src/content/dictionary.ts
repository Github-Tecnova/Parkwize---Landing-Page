import { cache } from "react";
import type { Locale } from "@/lib/i18n";
import enJson from "./en.json";

export type DictionaryType = typeof enJson;

export type NavigationDictionary = DictionaryType["navigation"];

export type ComingSoonDictionary = DictionaryType["comingSoon"];

const dictionaries: Record<Locale, () => Promise<DictionaryType>> = {
  en: () => import("./en.json").then((module) => module.default),
  fr: () => import("./fr.json").then((module) => module.default),
};

export const getDictionary = cache(async (locale: Locale) =>
  dictionaries[locale](),
);
