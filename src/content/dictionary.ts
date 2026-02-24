import { cache } from "react";
import enJson from "./en.json";

export type LangType = "fr" | "en";

export type DictionaryType = typeof enJson;

const dictionaries: { [key: string]: () => Promise<DictionaryType> } = {
  en: () => import("./en.json").then((module) => module.default),
  fr: () => import("./fr.json").then((module) => module.default),
};

export const getDictionary = cache(async (locale: LangType) =>
  dictionaries[locale](),
);
