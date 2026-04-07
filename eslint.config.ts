import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const compat = new FlatCompat({
  baseDirectory: process.cwd(),
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const config = [
  {
    linterOptions: {
      reportUnusedDisableDirectives: "off" as const,
    },
  },
  ...nextCoreWebVitals,
  ...compat.config({
    extends: ["plugin:@typescript-eslint/recommended", "plugin:import/recommended"],
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      "react-hooks/set-state-in-effect": "off",
    },
  }),
  {
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
];

export default config;
