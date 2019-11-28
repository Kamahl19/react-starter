# React Starter

## What’s Inside?

- [TypeScript](https://www.typescriptlang.org/) - a typed superset of JavaScript
- [create-react-app](https://facebook.github.io/create-react-app/) - create React apps with no build configuration
- [Ant.Design](https://ant.design/) - a UI library
- [Storybook](https://storybook.js.org/) - a development environment for UI components with [a11y](https://github.com/storybookjs/storybook/tree/master/addons/a11y), [actions](https://github.com/storybookjs/storybook/tree/master/addons/actions), [knobs](https://github.com/storybookjs/storybook/tree/master/addons/knobs), [viewport](https://github.com/storybookjs/storybook/tree/master/addons/viewport) and [router](https://github.com/gvaldambrini/storybook-router) addons
- [JWT](https://jwt.io/) Authorization - including all the common features such as Sign-up, Login, Logout, Forgotten password, Email verification
- [axios](https://github.com/axios/axios) - promise based HTTP client
- [i18next](https://www.i18next.com/) - an internationalization framework
  - [i18next scanner](https://github.com/i18next/i18next-scanner) - scans the code, extracts translation keys/values and produces i18n resource file
- [LESS](http://lesscss.org/) - dynamic stylesheet language
- [redux](https://redux.js.org/) - a state container
  - [redux-saga](https://github.com/redux-saga/redux-saga) - a side effect model for Redux apps
  - [reselect](https://github.com/reduxjs/reselect) - selector library for Redux
  - [redux-persist](https://github.com/rt2zz/redux-persist) - persist and rehydrate a Redux store
  - [redux-logger](https://github.com/LogRocket/redux-logger) - logger for Redux
  - [redux-auth-wrapper](https://github.com/mjrussell/redux-auth-wrapper) - a HOC for handling Authentication and Authorization
  - [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension) - DevTools extension for browser
  - [redux-immutable-state-invariant](https://github.com/leoasis/redux-immutable-state-invariant) - detects mutations in Redux store
  - [typesafe-actions](https://github.com/piotrwitek/typesafe-actions) - action creators with type-free code
- [react-router](https://reacttraining.com/react-router/web/guides/quick-start) - declarative routing
  - [connected-react-router](https://github.com/supasate/connected-react-router) - Redux binding for React Router
  - [oaf-react-router](https://github.com/oaf-project/oaf-react-router) - an accessible wrapper for React Router to set proper scroll position & focus
- [prettier](https://prettier.io/) - opinionated code formatter
- [ESLint](https://eslint.org/) - pluggable linting utility
- [husky](https://github.com/typicode/husky) & [lint-staged](https://github.com/okonet/lint-staged) - run ESLint & Prettier before commiting new code
- [source-map-explorer](https://github.com/danvk/source-map-explorer) - analyze and debug space usage through source maps
- [dotenv](https://github.com/motdotla/dotenv) - loads environment variables from an `.env` file
- [react-app-polyfill](https://github.com/facebook/create-react-app/blob/master/packages/react-app-polyfill/README.md) - polyfill for IE11 and stable browsers defined with `browserslist`
- our own self-contained libraries that will soon be released as a separate npm packages:
  - [admin-layout](src/packages/admin-layout/README.md) - simple Admin Layout component
  - [ant-form-helpers](src/packages/ant-form-helpers/README.md) - useful wrapper over Ant's Form
  - [array-helpers](src/packages/array-helpers/README.md) - immutable Array modifiers for redux reducers
  - [react-google-translate-fix](src/packages/react-google-translate-fix/README.md) - fixes [React & Chrome Translate bug](https://github.com/facebook/react/issues/11538)
  - [responsive-navigation](src/packages/responsive-navigation/README.md) - simple wrapper for creating responsive menu
  - [spinner](src/packages/spinner/README.md) - management of Spinners for async calls

## Start app

To run app locally, run `yarn start` in app root directory. `react-scripts` will start web server at `http://localhost:3000` (or first next free port).
All the Auth functionality such as Sign-up, Login, Reset password etc. requires a backend app. You can either write your own or use the [Node API Starter](https://github.com/Kamahl19/node-api-starter) which works with `React Starter` out of the box.

## Build app

To build app, run `yarn build` in app root directory.

## Project structure

```
-| .github/: GitHub workflows for CI/CD
-| public/: Public assets
-| src/
 |--| app/: Main application (framework) files.
 |--| common/: Base components, services, utils, rules, enums etc. used in the whole app.
 |--| features/: Features bundled into separate modules including containers, components, ducks, apis etc.
 |--| packages/: Our own self-contained libraries that will soon be released as a separate npm packages
 |--| index.tsx: application entry file
-| storybook/: Storybook configuration and addons.
```

## Prettier

This project uses [Prettier](https://prettier.io/), an opinionated code formatter. In order to format code manually, run `yarn format` in app root directory. All the code is also formatted automatically on `pre-commit` hook.

## ESLint

Project comes with ESLint configured. It helps you prevent common errors.

There are multiple ways how to run ESLint.

- CLI: `yarn lint`
- in browser console while developing (after running `yarn start`)
- it runs automatically on `pre-commit` hook
- in IDE if supported (Visual Studio Code supports reports)

## Storybook

We suggest developing component in isolation. For this reason, project comes with [Storybook](https://storybook.js.org/) pre-configured.

To run separated development environment, run `yarn storybook` which will start dedicated web server at `http://localhost:9009`.

To build static storybook, run `yarn storybook:build`. This creates a static webpage which you can deploy and showcase your components to others.

More information about supported features can be found in [Storybook's Github repository](https://github.com/storybooks/storybook)

## i18n

Running `yarn extract-translations` will update alphabetically sorted JSON files with key-translations pairs. It will use default messages for keys without explicit translations.

## Analysing production JS bundle

Project comes with the `source-map-explorer` which analyzes the production JS bundle. To use it just run `yarn build` and then `yarn analyze`.

## Updating dependencies

Project comes with the default [Renovate](https://renovatebot.com) config `renovate.json`. It takes care of automated dependency updates and it's free of charge for open-source projects. More about how to [configure here](https://renovatebot.com/docs).

## CI/CD

We are using [GitHub's Actions](https://github.com/features/actions) to run integration checks on each PR. We plan to add deployment of master branch to GH pages as well as deploying the Storybook.

## More Docs & Guides

This project is built on top of `create-react-app` with many [more usefull guides](https://facebook.github.io/create-react-app/docs/getting-started).
