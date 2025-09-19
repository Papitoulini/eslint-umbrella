import base from "./base.js";
import reactHooks from "eslint-plugin-react-hooks";
export default function reactPdf() {
  return [
    ...base(),
    { plugins: { "react-hooks": reactHooks },
      languageOptions: { globals: { process: "readonly", Buffer: "readonly" } },
      rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn"
      } }
  ];
}
