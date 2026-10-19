/*
 * Copyright (c) 2025. Tecnova
 */

import type { Config } from "tailwindcss";

import tailwind_animate from "tailwindcss-animate";
import tailwind_typo from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  content: [
    "./src/(pages)/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xl: "1280px",
      },
      transitionDuration: {
        "0": "0ms",
        "2000": "1800ms",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        display: [
          "clamp(2.5rem, 1.6rem + 3.4vw, 4.25rem)",
          { lineHeight: "1.02", letterSpacing: "-0.035em" },
        ],
        h1: [
          "clamp(2.25rem, 1.6rem + 2.9vw, 3.75rem)",
          { lineHeight: "1.05", letterSpacing: "-0.03em" },
        ],
        h2: [
          "clamp(1.875rem, 1.35rem + 2.2vw, 3.125rem)",
          { lineHeight: "1.08", letterSpacing: "-0.025em" },
        ],
        h3: [
          "clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)",
          { lineHeight: "1.25", letterSpacing: "-0.015em" },
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
        glass: "var(--glass-shadow)",
        media: "var(--shadow-media)",
        "card-deep": "0 30px 60px -30px rgba(2, 11, 46, 0.6)",
        shadow: "var(--shadow)",
        "shadow-s": "var(--shadow-s)",
        "shadow-m": "var(--shadow-m)",
        "shadow-l": "var(--shadow-l)",
        "shadow-inner-s": "var(--shadow-inner-s)",
        "shadow-inner-m": "var(--shadow-inner-m)",
        "shadow-inner-l": "var(--shadow-inner-l)",
        "shadow-inner-xl": "var(--shadow-inner-xl)",
      },
      colors: {
        bg: "var(--bg)",
        "bg-light": "var(--bg-light)",
        "bg-dark": "var(--bg-dark)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        highlight: "var(--highlight)",
        "border-card": "var(--border-card)",
        title: "var(--title-1)",
        "title-2": "var(--title-2)",
        sidebar: "var(--sidebar)",
        primary_action: "#5486ff",
        primary_action_dark: "#466bcd",
        parkwize_blue: "#0658f6",
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
          strong: "var(--deck-strong)",
          tint: "var(--deck-tint)",
        },
        ink: "var(--ink)",
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
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        "border-light": "var(--border-light)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
      animation: {
        "hub-flow": "hub-flow 3.2s linear infinite",
        "hub-pulse": "hub-pulse 3.6s ease-out infinite",
        blink: "blink 1.6s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
    },
  },
  plugins: [tailwind_animate, tailwind_typo],
} satisfies Config;
