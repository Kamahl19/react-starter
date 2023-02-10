# React Starter

[![Main CI Status](https://github.com/Kamahl19/react-starter/workflows/CI/badge.svg?branch=main)](https://github.com/Kamahl19/react-starter/actions?query=workflow%3ACI+branch%3Amain)

## What’s Inside?

- [TypeScript](https://www.typescriptlang.org/) - typed superset of JavaScript
- [Vite](https://vitejs.dev/) - next generation frontend tooling
- [Ant.Design](https://ant.design/) - UI library
  - [Emotion](https://emotion.sh/) - CSS in JS library
  - Light and Dark themes
- [JWT](https://jwt.io/) Authentication - including all the common features such as Sign-up, Login, Logout, Forgotten password, Email verification
- [Zod](https://github.com/colinhacks/zod) - TypeScript-first schema validation with static type inference
- [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) based API client
  - [zod-fetch](https://github.com/mattpocock/zod-fetch) - to make API client type-safe
- [react-query](https://tanstack.com/query/) - asynchronous state management with declarative, always-up-to-date auto-managed queries and mutations
- [i18next](https://www.i18next.com/) - internationalization framework
  - [i18next-parser](https://github.com/i18next/i18next-parser) - parses the code, extracts translation keys and produces i18n resource file
- [Recoil](https://recoiljs.org/) - state management library
  - [recoil-persist](https://github.com/polemius/recoil-persist) - persist and rehydrate Recoil store
  - [recoil-nexus](https://github.com/luisanton-io/recoil-nexus) - allows accessing Recoil store from outside components
- [React Router](https://reactrouter.com/) - declarative routing
  - [use-react-router-breadcrumbs](https://github.com/icd2k3/use-react-router-breadcrumbs) - hook for generating route breadcrumbs
- [react-error-boundary](https://github.com/bvaughn/react-error-boundary) - simple reusable React error boundary component
- [Vitest](https://vitest.dev/) - blazing fast Vite-native unit test framework
  - [Testing Library](https://testing-library.com/) - simple and complete testing utilities that encourage good testing practices
  - [MSW](https://mswjs.io/) - API mocking library for browser and Node.js
  - [@mswjs/data](https://mswjs.io/) - data modeling and relation library for testing
  - [cross-fetch](https://github.com/lquixada/cross-fetch) - polyfill Fetch API for testing
  - [mock-match-media](https://github.com/Ayc0/mock-match-media) - mock window.matchMedia for testing
- [Prettier](https://prettier.io/) - opinionated code formatter
- [ESLint](https://eslint.org/) - pluggable linting utility
- [Husky](https://github.com/typicode/husky) & [lint-staged](https://github.com/okonet/lint-staged) - run ESLint & Prettier before commiting new code
- [CI/CD](https://github.com/features/actions) - Github Actions to run integration tests on each PR & Main branch
- [source-map-explorer](https://github.com/danvk/source-map-explorer) - analyze and debug space usage through source maps

You can read more about what's included and why here [DOCS.md](./DOCS.md).

## Getting Started

Just clone the repo with `git clone https://github.com/Kamahl19/react-starter.git` or click on "Use this template" button above.

## Prerequisites

1. Install [nvm](https://github.com/nvm-sh/nvm) (Node version manager)
1. Install Node v18 `nvm install 18`
1. Use Node v18 `nvm use 18`
1. Upgrade NPM CLI `npm upgrade -g npm`
1. Install dependencies `npm i`
1. Edit the `.env` file according to your needs

## Start app

To run the app locally, run `npm start` in app root directory. Vite will start web server in the development mode at `http://localhost:3000` (or the first next free port).

This project includes [Mock Service Worker](https://mswjs.io/) to mock API. It starts automatically and provides API for authentication and user functionality.

## Build app

To build the app for production, run `npm run build` in app root directory. Your app is then ready to be deployed from the `/dist` folder. See the [Building for Production](https://vitejs.dev/guide/build.html#browser-compatibility) and [Deploying a Static Site](https://vitejs.dev/guide/static-deploy.html) for more information.

## Test app

Run `npm run test` to launch the test runner in the interactive watch mode. See [Vitest docs](https://vitest.dev/) for more information.

## Prettier

This project uses [Prettier](https://prettier.io/), an opinionated code formatter. In order to format code manually, run `npm run format` in app root directory. All the code is also formatted automatically on `pre-commit` hook. There is also `npm run format-check` for CI purposes to check if code is formatted properly.

## ESLint

Project comes with ESLint configured. It helps you prevent common errors.

There are multiple ways how to run ESLint.

- CLI: `npm run lint`
- in terminal while developing (after running `npm start`)
- it runs automatically on `pre-commit` hook
- in IDE if supported

## i18n

Running `npm run extract-translations` will first parse the whole codebase to find all used i18n keys. Then it inserts missing keys into the JSON files and removes deprecated keys which are not used in the codebase anymore. The result will be an alphabetically sorted JSONs containing all the currently used i18n keys in the codebase.

## Analysing production JS bundle

Project comes with the `source-map-explorer` which analyzes the production JS bundle. To use it just run `npm run analyze`.

## Updating dependencies

Project comes with the default [Renovate](https://renovatebot.com) config `renovate.json`. It takes care of automated dependency updates and it's free for open-source projects. More about how to [configure here](https://renovatebot.com/docs).

## CI/CD

This project is using [GitHub's Actions](https://github.com/features/actions) to run [integration tests](.github/workflows/CI.yml) on each PR and Main branch. It includes running eslint, prettier, tests and building the app. PR becomes mergable only if it passes. We also show badge on top of `README.md` to show Main branch status. If you don't use GitHub you can remove the `.github` folder, otherwise follow these steps to configure your GitHub repository:

1. Go to Settings -> Branches -> Add rule
   - Apply to your main branch
   - Require status checks to pass before merging
   - Select build checks being run in CI.yml
2. Update path to your repository (eg. `Kamahl19/react-starter`) and name of the branch for CI badge in `README.md`

## More Docs & Guides

Please read [DOCS.md](./DOCS.md) for more useful guides and documentation.

## Keeping up with updates

Once you start building your own app on top of React Starter you will probably want to keep up-to-date with the new updates of React Starter. This can be easily achieved using GitHub's compare feature. We suggest this process:

1. When you clone the React Starter repo, don't forget to write down the hash of [latest main's commit](https://github.com/Kamahl19/react-starter/commits/main)
2. Every once in a while, compare the version of React Starter you used with the current version of React Starter like this `https://github.com/Kamahl19/react-starter/compare/{YOUR_LATEST_REACT_STARTER_COMMIT_HASH}...main`
3. Go through the diff and apply the changes in your own app
4. Commit these changes into your own repo with this commit message: `Updating to React Starter hash: {LATEST_REACT_STARTER_COMMIT_HASH}`. This way you always keep the hash of the React Starter's version you currently use in your app

## License

This is open source software [licensed as MIT](https://github.com/Kamahl19/react-starter/blob/main/LICENSE).
