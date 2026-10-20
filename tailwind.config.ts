/*
 * Copyright (c) 2025-2026. Tecnova
 */

import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        h1: [
          "clamp(2.25rem, 1.6rem + 2.9vw, 3.75rem)",
          { lineHeight: "1.05", letterSpacing: "-0.03em" },
        ],
        h2: [
          "clamp(1.875rem, 1.35rem + 2.2vw, 3.125rem)",
          { lineHeight: "1.08", letterSpacing: "-0.025em" },
        ],
        lead: [
          "clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)",
          { lineHeight: "1.6" },
        ],
      },
      dropShadow: {
        media: "0 28px 36px rgba(2, 12, 51, 0.26)",
        soft: "0 12px 18px rgba(2, 12, 51, 0.16)",
      },
      boxShadow: {
        media: "var(--shadow-media)",
        "card-deep": "0 30px 60px -30px rgba(2, 11, 46, 0.6)",
      },
      colors: {
        foreground: "var(--foreground)",
        ring: "var(--ring)",
        destructive: "var(--destructive)",
        muted: {
          foreground: "var(--muted-foreground)",
        },
        brand: {
          DEFAULT: "var(--brand)",
          hover: "var(--brand-hover)",
          foreground: "var(--brand-foreground)",
          soft: "var(--brand-soft)",
        },
        glass: {
          hover: "var(--glass-hover)",
          divider: "var(--glass-divider)",
        },
        scrim: "var(--scrim)",
        bar: {
          fg: "var(--bar-fg)",
          muted: "var(--bar-muted)",
          logo: "var(--bar-logo)",
          hover: "var(--bar-hover)",
        },
        inverse: {
          DEFAULT: "var(--inverse)",
          foreground: "var(--inverse-foreground)",
          muted: "var(--inverse-muted)",
          border: "var(--inverse-border)",
          hover: "var(--inverse-hover)",
        },
        success: "var(--success)",
        deck: {
          DEFAULT: "var(--deck-blue)",
          bright: "var(--deck-bright)",
          tint: "var(--deck-tint)",
        },
        ink: "var(--ink)",
        navy: {
          DEFAULT: "var(--navy)",
          raised: "var(--navy-raised)",
        },
        bezel: "var(--bezel)",
        copy: "var(--copy)",
        hairline: "var(--hairline)",
        maple: "var(--maple-red)",
        panel: {
          rule: "var(--panel-rule)",
          tile: "var(--panel-tile)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          muted: "var(--surface-muted)",
          border: "var(--surface-border)",
        },
      },
      keyframes: {
        "hub-flow": {
          from: { strokeDashoffset: "50" },
          to: { strokeDashoffset: "0" },
        },
        "hub-pulse": {
          "0%": {
            transform: "translate(-50%, -50%) scale(0.7)",
            opacity: "0.9",
          },
          "100%": {
            transform: "translate(-50%, -50%) scale(1.15)",
            opacity: "0",
          },
        },
        blink: {
          "50%": { opacity: "0.35" },
        },
        marquee: {
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "hub-flow": "hub-flow 3.2s linear infinite",
        "hub-pulse": "hub-pulse 3.6s ease-out infinite",
        blink: "blink 1.6s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
