import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { ESLint } from "eslint";

import {
	base,
	baseTypeChecked,
	express,
	nest,
	nestTypeChecked,
	next,
	react,
	reactNative,
	reactPdf
} from "../src/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const fixturesDir = path.join(__dirname, "fixtures");
const tsconfigPath = path.join(fixturesDir, "tsconfig.json");

const formatMessages = messages =>
	messages
		.map(message => `${message.ruleId ?? "unknown"}: ${message.message}`)
		.join("\n");

const withTsconfigRoot = (config, tsconfigRootDir) => [
	...config,
	{ languageOptions: { parserOptions: { tsconfigRootDir } } }
];

async function lintText(config, code, { filename, cwd = process.cwd() } = {}) {
	const eslint = new ESLint({
		cwd,
		overrideConfigFile: null,
		overrideConfig: config,
		ignore: false
	});

	const results = await eslint.lintText(code, { filePath: path.join(cwd, filename) });
	const errors = results.flatMap(result => result.messages.filter(message => message.severity === 2));

	assert.equal(
		errors.length,
		0,
		errors.length ? `Unexpected ESLint errors:\n${formatMessages(errors)}` : undefined
	);
}

test("base preset lints a simple module", async () => {
	await lintText(
		base(),
		"const value = 1; export default value;",
		{ filename: "base.js" }
	);
});

test("react preset lints JSX", async () => {
	await lintText(
		react(),
		"const App = () => <div />; export default App;",
		{ filename: "component.jsx" }
	);
});

test("next preset lints a page component", async () => {
	await lintText(
		next(),
		"export default function Page() { return <div />; }",
		{ filename: "page.jsx" }
	);
});

test("express preset lints a basic app", async () => {
	await lintText(
		express(),
		"import express from \"express\"; const app = express(); app.get(\"/\", (req, res) => { res.send(\"ok\"); }); export default app;",
		{ filename: "server.js" }
	);
});

test("nest preset lints a service class", async () => {
	await lintText(
		nest(),
		"export class ExampleService { getValue() { return 1; } }",
		{ filename: "service.ts" }
	);
});

test("react-native preset lints a component", async () => {
	await lintText(
		reactNative(),
		"import { StyleSheet, View } from \"react-native\"; const styles = StyleSheet.create({ container: { flex: 1 } }); const App = () => <View style={styles.container} />; export default App;",
		{ filename: "app.jsx" }
	);
});

test("react-pdf preset lints a hook-based component", async () => {
	await lintText(
		reactPdf(),
		"import { useEffect } from \"react\"; export default function Doc() { useEffect(() => {}, []); return null; }",
		{ filename: "doc.jsx" }
	);
});

test("base type-checked preset lints TS", async () => {
	await lintText(
		withTsconfigRoot(baseTypeChecked([tsconfigPath]), fixturesDir),
		"export const value = 1;",
		{ filename: "typechecked.ts", cwd: fixturesDir }
	);
});

test("nest type-checked preset lints TS", async () => {
	await lintText(
		withTsconfigRoot(nestTypeChecked([tsconfigPath]), fixturesDir),
		"export class ExampleService { getValue(): number { return 1; } }",
		{ filename: "nest.ts", cwd: fixturesDir }
	);
});
