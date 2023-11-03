# React Starter

[![Main CI Status](https://github.com/Kamahl19/react-starter/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/Kamahl19/react-starter/actions?query=workflow:test+branch:main)

### 🔥 [Live Demo](https://react-starter-delta-one.vercel.app/) 🔥

## Documentation

There is a more extensive documentation at [DOCS.md](./DOCS.md).

## Branches

There are multiple alternative versions of this starter project commited to different branches:

- [main branch](https://github.com/Kamahl19/react-starter) - the most general version of this starter
- [Supabase branch](https://github.com/Kamahl19/react-starter/tree/supabase) - using Supabase (Firebase alternative) which provides a Postgres database, authentication, instant APIs, edge functions, realtime subscriptions, storage, etc... See the [diff here](https://github.com/Kamahl19/react-starter/compare/main...supabase).

## Features

- [TypeScript](https://www.typescriptlang.org/) - typed superset of JavaScript
- [Vite](https://vitejs.dev/) - next generation frontend tooling
- [Ant.Design](https://ant.design/) - UI library
  - [Emotion](https://emotion.sh/) - CSS in JS library
  - Light and Dark themes
- [JWT](https://jwt.io/) Authentication - including all the common features such as Sign-up, Sign-in, Sign-out, Reset password, Email confirmation
- [Zod](https://github.com/colinhacks/zod) - TypeScript-first schema validation with static type inference
- [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) based API client
  - [zod-fetch](https://github.com/mattpocock/zod-fetch) - to make API client type-safe
- [react-query](https://tanstack.com/query/) - asynchronous state management with declarative, always-up-to-date auto-managed queries and mutations
- [i18next](https://www.i18next.com/) - internationalization framework
  - [i18next-browser-languagedetector](https://github.com/i18next/i18next-browser-languageDetector) - language detection plugin
  - [i18next-parser](https://github.com/i18next/i18next-parser) - parses the code, extracts translation keys and produces i18n resource file
- [Jotai](https://jotai.org/) - state management library
- [React Router](https://reactrouter.com/) - declarative routing
  - [use-react-router-breadcrumbs](https://github.com/icd2k3/use-react-router-breadcrumbs) - hook for generating route breadcrumbs
  - [use-query-params](https://github.com/pbeshai/use-query-params) - hook for managing state in URL query parameters with easy serialization
- [react-error-boundary](https://github.com/bvaughn/react-error-boundary) - simple reusable React error boundary component
- [Vitest](https://vitest.dev/) - blazing fast Vite-native unit test framework
  - [Testing Library](https://testing-library.com/) - simple and complete testing utilities that encourage good testing practices
  - [MSW](https://mswjs.io/) - API mocking library for browser and Node.js
  - [@mswjs/data](https://github.com/mswjs/data) - data modeling and relation library for testing
  - [jsdom-testing-mocks](https://github.com/trurl-master/jsdom-testing-mocks) - a set of tools for emulating browser behavior in jsdom environment
- [Prettier](https://prettier.io/) - opinionated code formatter
- [ESLint](https://eslint.org/) - pluggable linting utility
- [Husky](https://github.com/typicode/husky) & [lint-staged](https://github.com/okonet/lint-staged) - run ESLint & Prettier before commiting new code
- [CI/CD](https://github.com/features/actions) - Github Actions to run integration tests on each PR & Main branch
- [source-map-explorer](https://github.com/danvk/source-map-explorer) - analyze and debug space usage through source maps
- [rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer) - visualize and analyze your bundle

## Installation

- [Install nvm](https://github.com/nvm-sh/nvm) (Node version manager)
- Install Node v20 and upgrade npm
  ```bash
  nvm install 20
  nvm use 20
  npm upgrade -g npm
  ```
- Clone this repository
  ```bash
  git clone https://github.com/Kamahl19/react-starter.git
  ```
- Install project dependencies
  ```bash
  npm i
  ```
- Edit the `.env` file

## Usage

Start the app locally

```bash
npm start
```

Vite will run web server in the development mode at `http://localhost:3000`.

This project includes [Mock Service Worker](https://mswjs.io/) to mock API. It starts automatically and provides API for authentication and user functionality.

## Building for Production

Build the app for production

```bash
npm run build
```

Your app is then ready to be deployed from the `/dist` folder. See the [Building for Production](https://vitejs.dev/guide/build.html#browser-compatibility) and [Deploying a Static Site](https://vitejs.dev/guide/static-deploy.html) for more information.

## Deploying to Vercel

You can read more about [how to deploy to Vercel here](https://vercel.com/docs/getting-started-with-vercel). In short, these are the necessary steps:

0. Confugiration file [vercel.json](./vercel.json) is already created in this project
1. Create new Vercel Project
2. Import GitHub repository
3. Add environment variable `VITE_API_URL` with value `/api`
4. Hit Deploy

Now each commit pushed to the `main` branch will be deployed to production automatically. Each branch or Pull Request will be [deployed as preview](https://vercel.com/docs/deployments/preview-deployments).

### Remove Vercel Demo

This project is being deployed to Vercel for demo purposes. Follow these steps to remove it:

- Find all occurences of `process.env.VERCEL` and remove them
- Delete `vercel.json` file

### Analysing & Visualizing production JS bundle

There are 2 different tools to analyze and visualize the production JS bundle:

- source-map-explorer
  ```bash
  npm run analyze
  ```
- rollup-plugin-visualizer
  ```bash
  npm run visualize
  ```

## Testing

Launch the test runner in the interactive watch mode

```bash
npm run test
```

See [Vitest docs](https://vitest.dev/) for more information.

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

Running `npm run i18n` will first parse the whole codebase to find all used i18n keys. Then it inserts missing keys into the JSON files and removes deprecated keys which are not used in the codebase anymore. The result will be an alphabetically sorted JSONs containing all the currently used i18n keys in the codebase.

## CI/CD

This project is using [GitHub's Actions](https://github.com/features/actions) to run [integration tests](.github/workflows/test.yml) on each PR and Main branch. It includes running eslint, prettier, tests and building the app. PR becomes mergable only if it passes. We also show badge on top of `README.md` to show Main branch status.

There is also a [code-quality action](.github/workflows/codeql-analysis.yml) to run [Github's CodeQL](https://codeql.github.com/) analysis.

If you don't use GitHub you can remove the `.github` folder, otherwise follow these steps to configure your GitHub repository:

1. Go to Settings -> Branches -> Add rule
   - Apply to your main branch
   - Require status checks to pass before merging
   - Select build checks being run in test.yml
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
