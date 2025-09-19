// src/base-typechecked.js
import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import unused from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";             // ← default import

/**
 * Type-aware base preset (requires a tsconfig).
 * @param {string[]} project - tsconfig paths (default: ["tsconfig.json"])
 * @returns {import('eslint').Linter.FlatConfig[]}
 */
export default function baseTypeChecked(project = ["tsconfig.json"]) {
	return tseslint.config(
		// 1) general ignores
		{ ignores: ["dist", "build", "coverage", "**/*.min.*"] },

		// 2) core JS rules
		js.configs.recommended,

		// 3) TS type-aware recommended presets (this sets the TS parser & plugin)
		...tseslint.configs.recommendedTypeChecked,

		// 4) your extra plugins/rules + the project's tsconfig paths
		{
			plugins: { import: importPlugin, "unused-imports": unused },
			rules: {
				"no-console": ["warn", { allow: ["warn", "error"] }],
				"no-debugger": "warn",

				"import/order": ["warn", {
					alphabetize: { order: "asc", caseInsensitive: true },
					"newlines-between": "always"
				}],

				"unused-imports/no-unused-imports": "warn",
				"unused-imports/no-unused-vars": ["warn", {
					vars: "all",
					varsIgnorePattern: "^_",
					args: "after-used",
					argsIgnorePattern: "^_"
				}]
			},
			languageOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				parserOptions: {
					project,                  // ← pass your tsconfig paths here
					// tsconfigRootDir: new URL(".", import.meta.url) // usually NOT needed; consumer root is better
				}
			}
		}
	);
}
