# _Lifeline_ NEXT (v2)

[![wakatime](https://wakatime.com/badge/user/604ea863-2306-4cbd-95b6-d2dbf642c915/project/3a60ba7d-55e3-47aa-87b7-f257f225ff3d.svg)](https://wakatime.com/badge/user/604ea863-2306-4cbd-95b6-d2dbf642c915/project/3a60ba7d-55e3-47aa-87b7-f257f225ff3d)

Welcome to the experimental next version of Lifeline which I'm hopeful will have many improvements and iterations over the original version. If you want to suggest new features, [please check out the Issues tab](https://github.com/the-wright-jamie/lifeline/issues)!

I'm accepting PRs, under the condition that you accept that I reserve the right to change the license at any time or make this a commercial product (with no promise of 'backpay' for your effort).

_Lifeline_ is a single page web application that allows you to select dependencies from [endoflife.date](https://endoflife.date/) and view important information about them in an all-in-one easy-to-use dashboard. Read [more info here](https://the-wright-jamie.dev/lifeline/#/about)!

## How to use

You'll have to host it yourself locally, there is currently no public instance of _Lifelife_ NEXT

## Can I host my own instance?

Sure, if you want! All data is stored on in the browser, so only static web application hosting (GitHub Pages, S3 Bucket) is needed. However, if you make any modifications to it and host publicly, you must make it clear that the instance that you are hosting has been modified. You also must publish all of your changes, as per the license. You are free to use it privately however you wish.

## Development Setup

I use `vite` with `vue` and `bun`, so make sure you have `bun` installed.

The following is mostly Vue generated documentation, but it's still useful to read if you've never worked with it before.

### Required tools

- [Bun](https://bun.sh/)

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) with the [Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (aka Volar).

### Type Support for `.vue` imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so the `tsc` CLI is replaced with `vue-tsc` for type checking. In editors, you'll need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

<!--
### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).
-->

### Project Setup

```sh
bun i
```

#### Compile and Hot-Reload for Development

```sh
bun dev
```

#### Compile and Minify for Production

```sh
bun build
```

<!--

#### Lint with [ESLint](https://eslint.org/)

```sh
bun lint
```
-->
