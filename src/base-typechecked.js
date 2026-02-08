import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import promise from "eslint-plugin-promise";
import unused from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

/**
 * Type-aware base preset (requires tsconfig).
 * @param {string[]} project - tsconfig paths (default: ["tsconfig.json"])
 * @returns {import('eslint').Linter.FlatConfig[]}
 */
export default function baseTypeChecked(project = ["tsconfig.json"]) {
	return tseslint.config(
		// 0) general ignores
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

		// 2) TS type-aware recommendations
		...tseslint.configs.recommendedTypeChecked,

		// 3) opinionated, broadly accepted best practices
		{
			plugins: {
				import: importPlugin,
				"unused-imports": unused,
				promise
			},

			languageOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				parserOptions: {
					project
					// tsconfigRootDir: new URL(".", import.meta.url) // usually not needed
				}
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
				"no-restricted-syntax": [
					"error",
					{
						selector: "ForInStatement",
						message:
							"for..in iterates over prototype chain; use Object.keys()/Object.entries() or for..of."
					},
					{
						selector: "LabeledStatement",
						message: "Labels make code confusing and hard to maintain."
					},
					{
						selector: "WithStatement",
						message: "`with` is disallowed in strict mode."
					}
				],

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
				// Avoid noisy false-positives without a TS resolver:
				// "import/no-unresolved": "off",

				/* ---------- Unused code ---------- */
				"unused-imports/no-unused-imports": "warn",
				"unused-imports/no-unused-vars": [
					"warn",
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

				/* ---------- TypeScript-specific best practices ---------- */
				// Prefer `import type` for types (tree-shaking & clarity)
				"@typescript-eslint/consistent-type-imports": [
					"error",
					{ prefer: "type-imports", disallowTypeAnnotations: false, fixStyle: "inline-type-imports" }
				],
				// Common foot-guns
				"@typescript-eslint/no-floating-promises": ["error", { ignoreVoid: true }],
				"@typescript-eslint/no-misused-promises": [
					"error",
					{ checksVoidReturn: { attributes: false } }
				],
				"@typescript-eslint/no-unused-expressions": [
					"error",
					{
						allowShortCircuit: false,
						allowTernary: false,
						allowTaggedTemplates: false
					}
				],
				"@typescript-eslint/no-unnecessary-condition": [
					"warn",
					{ allowConstantLoopConditions: true }
				],
				"@typescript-eslint/no-unnecessary-type-assertion": "warn",
				"@typescript-eslint/prefer-nullish-coalescing": [
					"warn",
					{
						ignoreConditionalTests: true,
						ignoreMixedLogicalExpressions: true
					}
				],
				"@typescript-eslint/prefer-optional-chain": "warn",
				"@typescript-eslint/consistent-type-definitions": ["warn", "type"],
				"@typescript-eslint/method-signature-style": ["warn", "property"],
				// Allow top-level void for fire-and-forget promises
				"@typescript-eslint/no-confusing-void-expression": [
					"error",
					{ ignoreVoidOperator: true, ignoreArrowShorthand: true }
				],
				// Avoid `async` without `await`
				"@typescript-eslint/require-await": "error",

				/* ---------- Async/await clarity ---------- */
				"no-return-await": "error",
				"no-await-in-loop": "warn"
			}
		}
	);
}
