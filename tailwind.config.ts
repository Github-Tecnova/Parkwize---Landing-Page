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
      boxShadow: {
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
          DEFAULT: "var(--primary))",
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
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
    },
  },
  plugins: [tailwind_animate, tailwind_typo],
} satisfies Config;
