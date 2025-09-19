import rn from "eslint-plugin-react-native";

import react from "./react.js";

/** @returns {import('eslint').Linter.FlatConfig[]} */
export default function reactNative() {
	return [
		...react(),
		{ ignores: ["android", "ios", ".expo", ".expo-shared", "expo-shared"] },
		{
			plugins: { "react-native": rn },

			// Common RN globals
			languageOptions: {
				globals: {
					__DEV__: "readonly",
					fetch: "readonly",
					FormData: "readonly",
					alert: "readonly",
					Request: "readonly",
					Response: "readonly",
					Headers: "readonly"
				}
			},

			rules: {
				/* --- Core RN best practices --- */
				"react-native/no-inline-styles": "warn",
				"react-native/no-unused-styles": "warn",
				"react-native/split-platform-components": "warn",

				// Useful extras (less noise than errors):
				"react-native/no-raw-text": "warn",                // text must be inside <Text>
				"react-native/no-color-literals": "warn",          // encourage theme/tokens
				"react-native/no-single-element-style-arrays": "warn"

				// If you hit unresolved imports with .ios/.android extensions,
				// either add a TS resolver or disable the rule in this preset:
				// "import/no-unresolved": "off"
			}
		}
	];
}
