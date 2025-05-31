import createDefaultConfig from "./default.js";
import eslintPluginReact from "eslint-plugin-react";

export default [
  ...createDefaultConfig({
    jsx: true,
    a11y: true,
    unicorn: true,
    importSort: true,
  }),
  eslintPluginReact.configs.recommended,
  {
    name: "eslint-umbrella/react",
    settings: {
      react: { version: "detect" },
    },
    rules: {
      "react/prop-types": "off",
      "react/display-name": "off",
    },
  },
];
