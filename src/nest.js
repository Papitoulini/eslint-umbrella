import base from "./base.js";
import promise from "eslint-plugin-promise";
export default function nest() {
  return [
    ...base(),
    { plugins: { promise },
      languageOptions: { globals: { process: "readonly" } },
      rules: {
        "no-restricted-syntax": ["warn", { selector: "CallExpression[callee.name='eval']", message: "Avoid eval() in Node." }],
        "promise/catch-or-return": "warn",
        "no-useless-constructor": "off"
      } }
  ];
}
