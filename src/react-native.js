import rn from "eslint-plugin-react-native";

import react from "./react.js";
export default function reactNative() {
  return [
    ...react(),
    { plugins: { "react-native": rn },
      languageOptions: { globals: { __DEV__: "readonly" } },
      rules: {
        "react-native/no-inline-styles": "warn",
        "react-native/no-unused-styles": "warn",
        "react-native/split-platform-components": "warn"
      } }
  ];
}
