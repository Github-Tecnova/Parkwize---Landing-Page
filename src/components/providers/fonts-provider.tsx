/*
 * Copyright (c) 2026. Tecnova
 */

"use client";

import React from "react";

type FontsContextType = {
  inter: string;
  poppins: string;
};

type FontsProviderProps = {
  children: React.ReactNode;
  inter: string;
  poppins: string;
};

const FontsContext = React.createContext<FontsContextType | undefined>(
  undefined,
);

export function FontsProvider({
  children,
  inter,
  poppins,
}: FontsProviderProps) {
  return (
    <FontsContext.Provider value={{ inter, poppins }}>
      {children}
    </FontsContext.Provider>
  );
}

export function useFonts() {
  const context = React.useContext(FontsContext);
  if (!context) {
    throw new Error("useFonts must be used within a FontsProvider");
  }
  return context;
}
