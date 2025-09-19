import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import promise from "eslint-plugin-promise";
import unused from "eslint-plugin-unused-imports";
import globals from "globals"; 
import tseslint from "typescript-eslint"; // we just use the config composer

/** @returns {import('eslint').Linter.FlatConfig[]} */
export default function base() {
	return tseslint.config(
		// 0) ignores
		{ ignores: [
		// package managers
			"node_modules",
			".pnpm-store", ".turbo", ".npm", ".yarn", ".yarn/*", "pnpm-lock.yaml", "yarn.lock",

			// builds / caches / coverage
			"dist", "build", "coverage", ".cache", ".eslintcache",

			// env / local
			".env", ".env.*", "*.local.*",

			// logs & misc
			"*.log", "logs", "tmp", "temp",

			// assets & generated
			"**/*.min.*", "**/*.map", "**/*.snap", "public", "static", "storybook-static",

			// tests/artifacts
			"cypress/videos", "cypress/screenshots", "playwright-report", "test-results",

			// monorepo tool outputs
			".nx", ".rush", ".changeset/*-changeset/*.md", // keep `.changeset/*.md` itself included

			// IDE
			".idea", ".vscode/*.tsbuildinfo"
		] },

		// 1) core JS recommendations
		js.configs.recommended,

		// 2) extra best practices + plugins
		{
			plugins: {
				import: importPlugin,
				"unused-imports": unused,
				promise,
				"@stylistic": stylistic
			},

			languageOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				globals: {
					...globals.es2024,
					...globals.node
				},
			},
			rules: {
				/* ---------- General safety / clarity ---------- */
				"no-console": ["warn", { allow: ["warn", "error"] }],
				"no-debugger": "warn",
				eqeqeq: ["error", "always", { null: "ignore" }],
				"no-var": "error",
				"prefer-const": ["error", { destructuring: "all" }],
				"object-shorthand": ["error", "always"],
				"prefer-template": "warn",
				"no-implicit-coercion": "warn",
				curly: ["error", "all"],
				"no-use-before-define": ["error", { functions: false, classes: true, variables: false }],
				"@stylistic/max-len": ["warn", {
					code: 120,                 // 👈 choose your limit
					tabWidth: 4,               // tabs count as 4 (match your indent config)
					ignoreUrls: true,          // don’t flag long URLs
					ignoreStrings: true,       // allow long strings
					ignoreTemplateLiterals: true,
					ignoreComments: true,      // allow long comments (JSDoc, etc.)
				}],
				/* ---------- Import hygiene ---------- */
				"import/order": [
					"warn",
					{
						groups: [
							"builtin",
							"external",
							"internal",
							["parent", "sibling", "index"],
							"type",
							"object",
							"unknown"
						],
						alphabetize: { order: "asc", caseInsensitive: true },
						"newlines-between": "always"
					}
				],
				// Enable if you add a resolver; otherwise can be noisy:
				// "import/no-unresolved": "off",

				"no-unused-vars": "off",
				/* ---------- Unused code ---------- */
				"unused-imports/no-unused-imports": "error",
				"unused-imports/no-unused-vars": [
					"error",
					{
						vars: "all",
						varsIgnorePattern: "^_",
						args: "after-used",
						argsIgnorePattern: "^_",
						ignoreRestSiblings: true
					}
				],

				/* ---------- Promise discipline ---------- */
				"promise/no-return-wrap": "error",
				"promise/no-new-statics": "error",
				"promise/no-nesting": "warn",
				"promise/no-promise-in-callback": "warn",
				"promise/no-callback-in-promise": "warn",
				"promise/valid-params": "error",

				/* ---------- Stylistic: tabs, smart alignment ---------- */
				"@stylistic/indent": [
					"error",
					"tab",
					{
						SwitchCase: 1,
						VariableDeclarator: 1,
						outerIIFEBody: 1,
						MemberExpression: 1,
						FunctionDeclaration: { body: 1, parameters: 1 },
						FunctionExpression: { body: 1, parameters: 1 },
						CallExpression: { arguments: 1 },
						ArrayExpression: 1,
						ObjectExpression: 1,
						ImportDeclaration: 1,
						flatTernaryExpressions: false,
						ignoreComments: false
					}
				],
				"@stylistic/no-mixed-spaces-and-tabs": ["warn", "smart-tabs"],
				"no-tabs": "off" // allow tabs explicitly
			}
		}
	);
}
