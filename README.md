# React Starter

## What’s Inside?

- `JWT` Authorization - including all the common features such as Sign-up, Login, Logout, Reset password, Email verification
- `redux-auth-wrapper` - a HOC for handling Authentication and Authorization
- `Ant.Design` - a UI library
- `axios` - promise based HTTP client
- `i18next` - an internationalization framework
- `less` - dynamic stylesheet language
- `react-router` - declarative routing
- `redux` - s state container
  - `redux-saga` - a side effect model for redux apps
  - `redux-persist` - persist and rehydrate a redux store
  - `redux-modal` - redux based modal solution
  - `redux-logger` - logger for redux
  - `reselect` - selector library for redux
- `create-react-app` - create react apps with no build configuration
- `prettier` - opinionated code formatter
- `source-map-explorer` - analyze and debug space usage through source maps
- `@storybook/react` - a development environment for UI components
- `dotenv` - loads environment variables from an `.env` file

## Start app

To run app locally, run `yarn start` in app root directory. `react-scripts` will start web server at `http://localhost:3000` (or first next free port).
All the Auth functionality such as Sign-up, Login, Reset password etc. requires a backend app. You can either write your own or use the [Express Starter](https://github.com/Kamahl19/express-starter) which works with `React Starter` out of the box.

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
-| stories/: Storybook stories used to component development and demos.
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

Project comes with the `source-map-explorer` which analyze and debug JS bundle. To use it just run `yarn analyze`
