// src/react.js
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

import base from "./base.js";

/** @returns {import('eslint').Linter.FlatConfig[]} */
export default function react() {
	return [
		...base(),

		{
			plugins: {
				react: reactPlugin,
				"react-hooks": reactHooks,
				"react-refresh": reactRefresh
			},

			languageOptions: {
				globals: {
					window: "readonly",
					document: "readonly",
					navigator: "readonly",
					fetch: "readonly",
					Request: "readonly",
					Response: "readonly",
					Headers: "readonly"
				}
			},

			settings: {
				react: { version: "detect" }
			},

			rules: {
				/* ---------- React hooks & fast refresh ---------- */
				"react-hooks/rules-of-hooks": "error",
				"react-hooks/exhaustive-deps": "warn",
				"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

				/* ---------- Core React sanity ---------- */
				"react/react-in-jsx-scope": "off",                 // new JSX transform
				"react/prop-types": "off",                         // prefer TS or explicit runtime checks
				"react/jsx-key": ["error", { checkFragmentShorthand: true }],
				"react/jsx-no-duplicate-props": "error",
				"react/jsx-no-comment-textnodes": "warn",
				"react/no-unstable-nested-components": "warn",
				"react/no-danger": "warn",
				"react/self-closing-comp": "warn",
				"react/jsx-boolean-value": ["warn", "never"],

				/* ---------- JSX indentation via @stylistic (tabs) ---------- */
				"@stylistic/jsx-indent": ["error", "tab"],
				"@stylistic/jsx-indent-props": ["error", "tab"],
				// Optional, if you want consistent quotes in JSX attributes:
				// "@stylistic/jsx-quotes": ["warn", "prefer-double"]
			}
		}
	];
}
