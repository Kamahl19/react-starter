# React Starter

## What’s Inside?

- `JWT` Authorization - including all the common features such as Sign-up, Login, Logout, Reset password, Email verification
- `Ant.Design` - a UI library
- `axios` - promise based HTTP client
- `i18next` - an internationalization framework
- `less` - dynamic stylesheet language
- `react-router` - declarative routing
  - `connected-react-router` - Redux binding for React Router
- `redux` - a state container
  - `redux-saga` - a side effect model for Redux apps
  - `redux-auth-wrapper` - a HOC for handling Authentication and Authorization
  - `redux-persist` - persist and rehydrate a Redux store
  - `redux-logger` - logger for Redux
  - `reselect` - selector library for Redux
  - `redux-immutable-state-invariant` - detects mutations in Redux store
- `create-react-app` - create React apps with no build configuration
- `prettier` - opinionated code formatter
- `source-map-explorer` - analyze and debug space usage through source maps
- `storybook` - a development environment for UI components
- `dotenv` - loads environment variables from an `.env` file

## Start app

To run app locally, run `yarn start` in app root directory. `react-scripts` will start web server at `http://localhost:3000` (or first next free port).
All the Auth functionality such as Sign-up, Login, Reset password etc. requires a backend app. You can either write your own or use the [Node API Starter](https://github.com/Kamahl19/node-api-starter) which works with `React Starter` out of the box.

## Build app

To build app, run `yarn build` in app root directory.

## Project structure

```
-| public/: Public assets
-| src/
 |--| app/: Main application (framework) files.
 |--| common/: Base components, services, utils, rules, enums etc. used in the whole app.
 |--| features/: Features bundled into separate modules including containers, components, ducks, apis etc.
 |--| resources/: locales, files etc.
 |--| index.js: application entry file
-| storybook/: Storybook configuration and addons.
```

## Prettier

This project uses [Prettier](https://prettier.io/), an opinionated code formatter. It also comes with Prettier configuration for [Visual Studio Code](https://code.visualstudio.com/). In order to format code manually, run `yarn format` in app root directory.

## ESLint

Project comes with ESLint configured. It helps you prevent common errors.

There are multiple ways how to run ESLint.

- CLI: `yarn lint`
- in browser console while developing (after running `yarn start`)
- in IDE if supported (Visual Studio Code supports reports)

## Storybook

We suggest developing component in isolation. For this reason, project comes with **Storybook** pre-configured.

To run separated development environment, run `yarn storybook` which will start dedicated web server at `http://localhost:9001`.

More information about supported features can be found in [Storybook's Github repository](https://github.com/storybooks/storybook)

## i18n

There are two ways how to define a translation string:

- Using i18next's `Trans` component - this is preferred option whenever possible, virtually always in `jsx` except when we need to translate HTML attributes such as `alt`, `placeholder`, `title`, etc. Usage of component brings together benefits of having unique keys while keeping texts in markups. The content of component is used as a default message, when no explicit translation resource is defined.
- Using i18next's `t` function - this is the option outside of `jsx` files and for HTML attributes.

Running `yarn extract-translations` will update alphabetically sorted JSON files with key-translations pairs. It will use default messages for keys without explicit translations.

## Analysing JS bundle

Project comes with the `source-map-explorer` which analyzes the production JS bundle. To use it just run `yarn build` and then `yarn analyze` for the `/src` code or `yarn analyze-deps` for the 3rd party dependencies bundle.

## Updating dependencies

Project comes with the default [Renovate](https://renovatebot.com) config `renovate.json`. It takes care of automated dependency updates and it's free of charge for open-source projects. More about how to [configure here](https://renovatebot.com/docs).

## More Docs & Guides

This project is built on top of `create-react-app` with many [more usefull guides](https://facebook.github.io/create-react-app/docs/getting-started).
