# React Starter

[![Master CI Status](https://github.com/Kamahl19/react-starter/workflows/CI/badge.svg?branch=master)](https://github.com/Kamahl19/react-starter/actions?query=workflow%3ACI+branch%3Amaster)

## What’s Inside?

- [TypeScript](https://www.typescriptlang.org/) - typed superset of JavaScript
- [Vite](https://vitejs.dev/) - next generation frontend tooling
- [Vitest](https://vitest.dev/) - blazing fast Vite-native unit test framework
  - [Testing Library](https://testing-library.com/) - simple and complete testing utilities that encourage good testing practices
- [Ant.Design](https://ant.design/) - UI library
- [JWT](https://jwt.io/) Authentication - including all the common features such as Sign-up, Login, Logout, Forgotten password, Email verification
- [SWR](https://swr.vercel.app/) - hooks for data fetching with stale-while-revalidate strategy
- [i18next](https://www.i18next.com/) - internationalization framework
  - [i18next-parser](https://github.com/i18next/i18next-parser) - parses the code, extracts translation keys and produces i18n resource file
- [LESS](http://lesscss.org/) - dynamic stylesheet language
- [Recoil](https://recoiljs.org/) - state management library
  - [recoil-persist](https://github.com/polemius/recoil-persist) - persist and rehydrate Recoil store
  - [recoil-nexus](https://github.com/luisanton-io/recoil-nexus) - allows accessing Recoil store from outside components
- [React Router](https://reactrouter.com/) - declarative routing
  - [oaf-react-router](https://github.com/oaf-project/oaf-react-router) - accessible wrapper for React Router to set proper scroll position & focus
- [react-error-boundary](https://github.com/bvaughn/react-error-boundary) - simple reusable React error boundary component
- [Prettier](https://prettier.io/) - opinionated code formatter
- [ESLint](https://eslint.org/) - pluggable linting utility
- [Husky](https://github.com/typicode/husky) & [lint-staged](https://github.com/okonet/lint-staged) - run ESLint & Prettier before commiting new code
- [CI/CD](https://github.com/features/actions) - Github Actions to run integration tests on each PR & Master branch
- [source-map-explorer](https://github.com/danvk/source-map-explorer) - analyze and debug space usage through source maps

You can read more about what's included and why here [DOCS.md](./DOCS.md).

## Getting Started

Just clone the repo with `git clone https://github.com/Kamahl19/react-starter.git` or click on "Use this template" button above.

Master branch is always passing CI build.

## Prerequisites

Edit the `.env` file according to your needs.

## Start app

To run the app locally, run `yarn start` in app root directory. Vite will start web server in the development mode at `http://localhost:3000` (or the first next free port).

All the Auth functionality such as Sign-up, Login, Reset password etc. requires a backend app. You can either write your own or use the [Node API Starter](https://github.com/Kamahl19/node-api-starter) which works with React Starter out of the box.

## Build app

To build the app for production, run `yarn build` in app root directory. Your app is then ready to be deployed from the `/dist` folder. See the [Building for Production](https://vitejs.dev/guide/build.html#browser-compatibility) and [Deploying a Static Site](https://vitejs.dev/guide/static-deploy.html) for more information.

## Test app

Run `yarn test` to launch the test runner in the interactive watch mode. See [Vitest docs](https://vitest.dev/) for more information.

## Prettier

This project uses [Prettier](https://prettier.io/), an opinionated code formatter. In order to format code manually, run `yarn format` in app root directory. All the code is also formatted automatically on `pre-commit` hook. There is also `yarn format-check` for CI purposes to check if code is formatted properly.

## ESLint

Project comes with ESLint configured. It helps you prevent common errors.

There are multiple ways how to run ESLint.

- CLI: `yarn lint`
- in terminal while developing (after running `yarn start`)
- it runs automatically on `pre-commit` hook
- in IDE if supported

## i18n

Running `yarn extract-translations` will first parse the whole codebase to find all used i18n keys. Then it inserts missing keys into the JSON file and removes deprecated keys which are not used in the codebase anymore. The result will be an alphabetically sorted JSON containing all the currently used i18n keys in the codebase.

## Analysing production JS bundle

Project comes with the `source-map-explorer` which analyzes the production JS bundle. To use it just run `yarn analyze`.

## Updating dependencies

Project comes with the default [Renovate](https://renovatebot.com) config `renovate.json`. It takes care of automated dependency updates and it's free for open-source projects. More about how to [configure here](https://renovatebot.com/docs).

## CI/CD

This project is using [GitHub's Actions](https://github.com/features/actions) to run [integration tests](.github/workflows/CI.yml) on each PR and Master branch. It includes running eslint, prettier, tests and building the app. PR becomes mergable only if it passes. We also show badge on top of `README.md` to show Master branch status. If you don't use GitHub you can remove the `.github` folder, otherwise follow these steps to configure your GitHub repository:

1. Go to Settings -> Branches -> Add rule
   - Apply to your master branch
   - Require status checks to pass before merging
   - Select build checks being run in CI.yml
2. Update path to your repository (eg. `Kamahl19/react-starter`) and name of the branch for CI badge in `README.md`

## More Docs & Guides

Please read [DOCS.md](./DOCS.md) for more useful guides and documentation.

## Keeping up with updates

Once you start building your own app on top of React Starter you will probably want to keep up-to-date with the new updates of React Starter. This can be easily achieved using GitHub's compare feature. We suggest this process:

1. When you clone the React Starter repo, don't forget to write down the hash of [latest master's commit](https://github.com/Kamahl19/react-starter/commits/master)
2. Every once in a while, compare the version of React Starter you used with the current version of React Starter like this `https://github.com/Kamahl19/react-starter/compare/{YOUR_LATEST_REACT_STARTER_COMMIT_HASH}...master`
3. Go through the diff and apply the changes in your own app
4. Commit these changes into your own repo with this commit message: `Updating to React Starter hash: {LATEST_REACT_STARTER_COMMIT_HASH}`. This way you always keep the hash of the React Starter's version you currently use in your app

## License

This is open source software [licensed as MIT](https://github.com/Kamahl19/react-starter/blob/master/LICENSE).
