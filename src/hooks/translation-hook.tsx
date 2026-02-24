"use client";

import React, { useState } from "react";
import { DictionaryType, getDictionary, LangType } from "@/content/dictionary";
import useSWR from "swr";

type TranslationContextType = {
  lang: LangType;
  setLang: (lang: LangType) => void;
  dict: DictionaryType;
};

const TranslationContext = React.createContext<
  TranslationContextType | undefined
>(undefined);

export default function TranslationProvider({
  children,
  initialDict,
}: {
  children: React.ReactNode;
  initialDict: DictionaryType;
}) {
  const [lang, setLang] = useState<LangType>("en");
  const [dict, setDict] = useState<DictionaryType>(initialDict);

  useSWR(`/get-dictionary/${lang}`, async () => {
    const dictionary = await getDictionary(lang);
    setDict(dictionary);
  });

  return (
    <TranslationContext.Provider value={{ lang, setLang, dict }}>
      {children}
    </TranslationContext.Provider>
  );
}

export const useTranslation = () => {
  const context = React.useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
