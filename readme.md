# eslint-umbrella

A shareable ESLint “umbrella” configuration designed for flat‐config (ESLint 9+) and legacy `.eslintrc` setups. Provides sensible defaults for Node.js, React, and Next.js projects—complete with stylistic, best-practice, Unicorn, import-sorting, and JSX accessibility rules. Everything is packaged under one npm module so you can install once and extend or override as needed.

---

## Table of Contents

1. [Features](#features)  
2. [Installation](#installation)  
3. [Quick Start / Flat Config Usage](#quick-start--flat-config-usage)  
   1. [Node-Only Projects](#node-only-projects)  
   2. [Adding React Support](#adding-react-support)  
   3. [Adding Next.js Support](#adding-nextjs-support)  
4. [Legacy `.eslintrc` Usage](#legacy-eslintrc-usage)  
5. [Configuration Options](#configuration-options)  
6. [Package Structure](#package-structure)  
7. [Contributing](#contributing)  
8. [Versioning & Releases](#versioning--releases)  
9. [Do I need to commit the `.tgz`?](#do-i-need-to-commit-the-tgz)  
10. [License](#license)

---

## Features

- **Flat-config ready (ESLint 9+)**: Works out of the box in `eslint.config.js`.  
- **Legacy “extends” support**: Can be used in `.eslintrc.cjs` if you prefer.  
- **Stylistic rules** powered by [@stylistic/eslint-plugin](https://github.com/your‐org/stylistic), enforcing tabs, double quotes, trailing commas, and more.  
- **Best Practice rules** from ESLint core (no-console, no-debugger, etc.).  
- **Unicorn plugin** rules (optional) for cleaner, safer code.  
- **Import-X plugin** for sorting and validating module imports (optional).  
- **JSX-A11y plugin** rules (optional, when React/JSX enabled).  
- **React plugin** rules (for JSX/TSX files).  
- **Next.js plugin** rules (for files under `apps/frontend/` or when using Next).  
- **Global settings** for Node built-ins, browser globals (when JSX enabled), and React version detector.  
- **Flexible API**: Factory functions allow toggling unicorn/a11y/importSort on or off.

---

## Installation

```bash
npm install --save-dev eslint-umbrella eslint@^9.0.0
