# ESLint Umbrella Presets ⚙️🛡️

![npm](https://img.shields.io/npm/v/%40eslint-umbrella/presets?label=%40eslint-umbrella%2Fpresets)
![license](https://img.shields.io/npm/l/%40eslint-umbrella/presets)
![node](https://img.shields.io/badge/node-%E2%89%A520.0-339933?logo=node.js&logoColor=white)
![eslint](https://img.shields.io/badge/ESLint-9.x-4B32C3?logo=eslint&logoColor=white)
![flat config](https://img.shields.io/badge/Flat%20Config-yes-1f6feb)

A collection of **flat ESLint configs** that unify modern defaults and best practices across many apps
(microservices, React, Next.js, Express, NestJS, React Native, React‑PDF). Centralize your lint rules once and
reuse them everywhere with pinned plugin versions — so all projects lint the same way.

---

## ✨ Features

- 🔧 **Flat config** (`eslint.config.js`) ready
- 🧩 **Presets**: `base`, `react`, `next`, `express`, `nest`, `react-native`, `react-pdf`, `test`, `base-typechecked`
- 🎯 **Consistent style** with `@stylistic` (tabs, smart alignment; JSX handled without conflicts)
- 🧹 **Dead code control** via `eslint-plugin-unused-imports`
- 📦 **Import hygiene** with sorted groups via `eslint-plugin-import`
- 🔒 Sensible **security/perf** nudges for server presets
- 🧠 **React Hooks** & **Fast Refresh** rules baked-in
- 🌍 **Globals** via `globals` package (browser / node) — no manual lists

---

## 📦 Install

**From npm (recommended):**
```bash
npm i -D @eslint-umbrella/presets
```

**Local workspace (while developing the presets):**
```bash
npm i -D @eslint-umbrella/presets@file:../eslint-umbrella
```

---

## 🚀 Quickstart

**React (JS/TS)**

```js
// eslint.config.js (consumer)
import { react } from "@eslint-umbrella/presets";
export default [...react()];
```

**Next.js**
```js
import { next } from "@eslint-umbrella/presets";
export default [...next()];
```

**Express**
```js
import { express } from "@eslint-umbrella/presets";
export default [...express()];
```

**NestJS**
```js
import { nest } from "@eslint-umbrella/presets";
export default [...nest()];
```

**React Native**
```js
import { reactNative } from "@eslint-umbrella/presets";
export default [...reactNative()];
```

**React‑PDF (Node renderers)**
```js
import { reactPdf } from "@eslint-umbrella/presets";
export default [...reactPdf()];
```

**Base / Type‑checked base**
```js
import { base, baseTypeChecked } from "@eslint-umbrella/presets";
export default [...base()];               // non type‑aware
// export default [...baseTypeChecked()]; // enable when using TS project refs
```

**Tests addon only**
```js
import { test } from "@eslint-umbrella/presets";
export default [...test()];
```

> ℹ️ All presets default to files `**/*.{js,jsx,ts,tsx}` and enable JSX parsing where relevant.
> You can override the scope by calling e.g. `react({ files: ["src/**/*.{jsx,tsx}"] })`.

---

## 🧱 What’s inside (highlights)

### `base` 🔩
- `@eslint/js` recommended + `typescript-eslint` config composer
- **Indentation**: `@stylistic/indent` with **tabs**
- **JSX excluded** from base indent to avoid conflicts with React preset
- **Curly**: `["error", "multi-line", "consistent"]` → allow one‑liners, require braces for multi‑line
- **Import order** & alphabetize; **unused imports/vars** removal
- `promise/*` best practices; sensible `max-len` (120) exceptions

### `react` ⚛️
- React, Hooks, Refresh plugins; `react/jsx-uses-vars` to avoid false “unused” on styled/JSX components
- JSX parser enabled; JSX indent handled via `@stylistic/jsx-*`
- Browser globals via `globals.browser`

### `next` ▲
- Extends `react`; ignores `.next`, `.vercel`, `out`
- Enables core Next.js rules; common browser+node globals

### `express` 🧰
- Extends `base`; server‑oriented safety and Promise discipline

### `nest` 🐱‍👤
- Extends `base`; relaxations for DI patterns, Node globals, eval/Function guards

### `react-native` 📱
- Extends `react`; RN plugin rules (`no-inline-styles`, `no-unused-styles`, etc.) and RN globals

### `react-pdf` 🖨️
- Extends `base`; Node‑side globals and safe eval guards; Hooks basics

### `test` 🧪
- Useful testing relaxations (console allowed, extraneous dev deps allowed, etc.)

---

## 🛠️ Editor setup (VS Code)

```jsonc
// .vscode/settings.json
{
  "eslint.experimental.useFlatConfig": true,
  "eslint.validate": ["javascript","javascriptreact","typescript","typescriptreact"],
  "editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" }
}
```

---

## ⚙️ Customising

All presets accept an optional options object:
```js
import { react } from "@eslint-umbrella/presets";
export default [...react({ files: ["src/**/*.{js,jsx}"] })];
```

You can layer additional objects **after** the preset for per‑repo tweaks:
```js
import { react } from "@eslint-umbrella/presets";
export default [
  ...react(),
  { files: ["**/*.{test,spec}.{js,jsx,ts,tsx}"], rules: { "no-console": "off" } }
];
```

---

## 🧪 Scripts

```json
{
  "scripts": {
    "lint": "eslint "src/**/*.{js,jsx,ts,tsx}" --cache --cache-location .eslintcache",
    "lint:fix": "npm run lint -- --fix"
  }
}
```

---

## 📦 Releasing (Changesets)

1. `npx changeset` → select packages, choose **minor**/**major**, write notes
2. `npm run version-packages` → applies versions & updates lockfile
3. `git commit -m "chore(release): version packages"`
4. `npm run release` → publishes to npm (or via CI)

> Do **not** delete pending `.changeset/*.md`; the version step consumes them automatically.

---

## 🤝 Contributing

PRs welcome! Keep rule changes focused, include rationale, and test in at least one JS and one TS repo.
Consider noise levels for CI (`--max-warnings=0`) when promoting rules to `error`.

---

## 📝 License

MIT © 2025 eslint‑umbrella

