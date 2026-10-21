/*
 * Copyright (c) 2025-2026. Tecnova
 */

import { Color, SRGBColorSpace } from "three";
import { resolveCssColor } from "@/lib/dot-field";

export type GaragePalette = {
  slab: Color;
  asphalt: Color;
  line: Color;
  navy: Color;
  raised: Color;
  bezel: Color;
  accent: Color;
  deck: Color;
  surface: Color;
  muted: Color;
  success: Color;
  destructive: Color;
};

export function readPalette(element: HTMLElement): GaragePalette {
  const pick = (variable: string) => {
    const [r, g, b] = resolveCssColor(element, variable);
    return new Color().setRGB(r / 255, g / 255, b / 255, SRGBColorSpace);
  };

  return {
    slab: pick("--surface-muted"),
    asphalt: pick("--surface-border"),
    line: pick("--hairline"),
    navy: pick("--navy"),
    raised: pick("--navy-raised"),
    bezel: pick("--bezel"),
    accent: pick("--deck-bright"),
    deck: pick("--deck-blue"),
    surface: pick("--surface"),
    muted: pick("--inverse-muted"),
    success: pick("--success"),
    destructive: pick("--destructive"),
  };
}

export type GarageType = {
  display: string;
  mono: string;
  localeTag: string;
};

export function readType(element: HTMLElement, localeTag: string): GarageType {
  const styles = getComputedStyle(element);
  return {
    display: `${styles.getPropertyValue("--font-poppins").trim()}, sans-serif`,
    mono: `${styles.getPropertyValue("--font-mono").trim()}, monospace`,
    localeTag,
  };
}
