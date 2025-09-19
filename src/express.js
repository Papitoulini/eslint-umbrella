import base from "./base.js";
import security from "eslint-plugin-security";
import promise from "eslint-plugin-promise";
export default function express() {
  return [
    ...base(),
    { plugins: { security, promise },
      languageOptions: { globals: { process: "readonly", __dirname: "readonly", module: "readonly" } },
      rules: {
        "no-restricted-syntax": ["warn", { selector: "CallExpression[callee.name='eval']", message: "Avoid eval() in Node." }],
        "promise/catch-or-return": "warn",
        "security/detect-object-injection": "off"
      } }
  ];
}
