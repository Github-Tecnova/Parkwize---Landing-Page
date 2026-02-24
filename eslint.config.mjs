/*
 * Copyright (c) 2025. Tecnova
 */

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const isProd = process.env.NODE_ENV === "production";

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      // Disable expensive rules in production
      ...(isProd && {
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "react/no-unescaped-entities": "off",
        "react/display-name": "off",
        "react/jsx-key": "off",
        "@next/next/no-img-element": "off",
        "@next/next/no-html-link-for-pages": "off",
      }),
    },
  },
];

export default eslintConfig;
