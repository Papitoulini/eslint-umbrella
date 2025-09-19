import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import unused from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";           // default import

/** @returns {import('eslint').Linter.FlatConfig[]} */
export default function base() {
	return tseslint.config(
		{ ignores: ["dist", "build", "coverage", "**/*.min.*"] },
		js.configs.recommended,
		...tseslint.configs.recommended,
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
				}],
				"indent": ["warn", "tab", {
					"SwitchCase": 1,
					"VariableDeclarator": 1,
					"outerIIFEBody": 1,
					"MemberExpression": 1,
					"FunctionDeclaration": { "body": 1, "parameters": 1 },
					"FunctionExpression":  { "body": 1, "parameters": 1 },
					"CallExpression":      { "arguments": 1 },
					"ArrayExpression": 1,
					"ObjectExpression": 1,
					"ImportDeclaration": 1,
					"flatTernaryExpressions": false,
					"ignoreComments": false
				}],
				"no-mixed-spaces-and-tabs": ["warn", "smart-tabs"], // avoid mixing, allow smart alignment
				"no-tabs": "off", // make sure tabs are allowed

			},
			languageOptions: {
				ecmaVersion: "latest",
				sourceType: "module"
				// no parserOptions.project here (non type-aware preset)
			}
		}
	);
}
