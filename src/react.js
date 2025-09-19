// src/react.js
import stylistic from "@stylistic/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals"; 

import base from "./base.js";

/** @param {{ files?: string[] }=} options
 *  @returns {import('eslint').Linter.FlatConfig[]} */
export default function react(options = {}) {
	const files = options.files ?? ["**/*.{js,jsx,ts,tsx}"];

	return [
		...base(),

		{
			plugins: {
				react: reactPlugin,
				"react-hooks": reactHooks,
				"react-refresh": reactRefresh,
				"@stylistic": stylistic,
			},

			languageOptions: {
				parserOptions: { ecmaFeatures: { jsx: true } },
				globals: { ...globals.browser },
			},

			settings: { react: { version: "detect" } },

			rules: {
				/* ---------- React hooks & fast refresh ---------- */
				"react-hooks/rules-of-hooks": "error",
				"react-hooks/exhaustive-deps": "warn",
				"react-refresh/only-export-components": "off",

				/* ---------- Core React sanity ---------- */
				"react/react-in-jsx-scope": "off",
				"react/prop-types": "off",
				"react/jsx-key": ["error", { checkFragmentShorthand: true }],
				"react/jsx-no-duplicate-props": "error",
				"react/jsx-no-comment-textnodes": "warn",
				"react/no-unstable-nested-components": "off",
				"react/no-danger": "warn",
				"react/self-closing-comp": "warn",
				"react/jsx-boolean-value": ["warn", "never"],
				"react/jsx-uses-vars": "error", // ensure JSX identifiers count as "used"

				/* ---------- JSX indentation via @stylistic (tabs) ---------- */
				"@stylistic/jsx-indent-props": ["error", "tab"],
				// "@stylistic/jsx-quotes": ["warn", "prefer-double"],
			},
		},
	].map(cfg => ("ignores" in cfg ? cfg : { ...cfg, files }));
}