# _Lifeline_

[![wakatime](https://wakatime.com/badge/user/604ea863-2306-4cbd-95b6-d2dbf642c915/project/3a60ba7d-55e3-47aa-87b7-f257f225ff3d.svg)](https://wakatime.com/badge/user/604ea863-2306-4cbd-95b6-d2dbf642c915/project/3a60ba7d-55e3-47aa-87b7-f257f225ff3d)

_Lifeline_ is a single page web application that allows you to select dependencies from [endoflife.date](https://endoflife.date/) and view important information about them in an all-in-one easy-to-use dashboard. Read [more info here](https://the-wright-jamie.dev/lifeline/#/about)!

## How to use

For the ready-to-use version, just click [here](https://the-wright-jamie.dev/lifeline)!

## Can I host my own instance?

Sure, if you want! All data is stored on your browser, so only static web application hosting (GitHub Pages, S3 Bucket) is needed. However, if you make any modifications to it, you must make it clear that the instance that you are hosting has been modified. You also must publish all of your changes.

## Development Setup

I use `vite` with `vue` and `bun`, so make sure you have `bun` installed.

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

### Project Setup

```sh
bun install
```

#### Compile and Hot-Reload for Development

```sh
bun dev
```

#### Type-Check, Compile and Minify for Production

```sh
bun build
```

#### Lint with [ESLint](https://eslint.org/)

```sh
bun lint
```
