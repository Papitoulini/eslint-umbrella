import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

import base from "./base.js";

export default function react() {
	return [
		...base(),
		{
			plugins: {
				"react-hooks": reactHooks,
				"react-refresh": reactRefresh,
				"react": reactPlugin
			},
			rules: {
				"react-hooks/rules-of-hooks": "error",
				"react-hooks/exhaustive-deps": "warn",
				"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

				// JSX indentation (2 spaces)
				"react/jsx-indent": ["warn", "tab"],
				"react/jsx-indent-props": ["warn", "tab"]
			},
			settings: {
				react: { version: "detect" }
			}
		}
	];
}
