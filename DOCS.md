# Documentation

This project is based on couple of dependencies. It's advised to read through their documentations to understand their basic principles and capabilities.

Here is the list of selected documentation pages and other resources containing the most important and high-level information about these dependencies.

## Building

Build tooling for both development and production is provided by [Vite](https://vitejs.dev/). It's a replacement for the traditional Webpack/Babel setup created by [Evan You](https://evanyou.me/) (author of Vue.js). Thanks to the plugin system, it provides all the features that a frontend tooling might require without the need for a complex configuration. It is also significantly (100x) faster than Webpack/Babel for both development and production building.

It's best to start with this video [Vite in 100 Seconds](https://www.youtube.com/watch?v=KCrXgy8qtjM). You can continue with [Why Vite](https://vitejs.dev/guide/why.html) and its [Features](https://vitejs.dev/guide/features.html). There is also a [good article from Shopify Engineering](https://shopify.engineering/developer-experience-with-hydrogen-and-vite) about why they chose Vite for building Shopify frontends.

Vite configuration [vite.config.ts](./vite.config.ts) in this project also uses plugins for [React](https://github.com/vitejs/vite/tree/main/packages/plugin-react), [SVG components](https://github.com/pd4d10/vite-plugin-svgr), checking [TS types](https://vite-plugin-checker.netlify.app/checkers/typescript.html) and [ESLint](https://vite-plugin-checker.netlify.app/checkers/eslint.html), resolving [TS path mappings](https://github.com/aleclarson/vite-tsconfig-paths), [auto-prefixing](https://github.com/postcss/autoprefixer) CSS, and processing [Less](https://lesscss.org/features/).

This project is also entirely written in [TypeScript](https://www.typescriptlang.org/), a strongly typed programming language that builds on JavaScript. There is a good Get Started both for [JavaScript programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) and [Java Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-oop.html). The TS compiler options are defined in [tsconfig.json](./tsconfig.json).

## Testing

Testing a Vite based project is easiest with [Vitest](https://vitest.dev/) which uses the same configuration (through [vite.config.ts](./vite.config.ts)), sharing a common transformation pipeline during development, build, and test time. Vitest is a [Jest](https://jestjs.io/) drop-in replacement with the same API using the same libraries under the hood. Please read [Why Vitest](https://vitest.dev/guide/why.html) and [Comparison with Jest](https://vitest.dev/guide/comparisons.html#jest) to understand the need for migration from Jest to Vitest and its benefits. Here is a handy summary of its [Features](https://vitest.dev/guide/features.html) and [IDE Integration](https://vitest.dev/guide/ide.html) with IntelliJ IDEA and VSCode.

Vitest also provides a [neat UI](https://vitest.dev/guide/ui.html) to view and interact with the tests. Open it by running `yarn test:ui`.

Generally an [Enzyme](https://github.com/enzymejs/enzyme) library was used for testing React components. However [Enzyme is dead](https://dev.to/wojtekmaj/enzyme-is-dead-now-what-ekl), its last commit is from [09/21](https://github.com/enzymejs/enzyme/commits/master) and it doesn't work for [React v17](https://github.com/enzymejs/enzyme/issues/2429) nor [React v18](https://github.com/enzymejs/enzyme/issues/2524). For projects with hundreds/thousands of Enzyme based tests, this is a disaster. Although it isn't such a bad thing for new projects. Enzyme encouraged bad testing practices e.g. [shallow rendering](https://kentcdodds.com/blog/why-i-never-use-shallow-rendering) and [testing implementation details](https://kentcdodds.com/blog/testing-implementation-details) such as internal state, internal methods of the component, its lifecycle methods, and children.

Since [2018](https://github.com/testing-library/react-testing-library/releases/tag/v1.0.0), there is a better alternative ([recommended by React](https://reactjs.org/docs/testing.html#tools)) for testing frontend applications called [Testing Library](https://testing-library.com/). It's framework agnostic and officially supports testing plain DOM, React, React Native, Angular, Vue, Marko, Svelte, Preact, and many others. It encourages good testing practices and follows the principle of "The more your tests resemble the way your software is used, the more confidence they provide". It enables the developer to write unit tests, integration tests, and e2e tests. You can read more in the [Introduction](https://testing-library.com/docs/), [Guiding Principles](https://testing-library.com/docs/guiding-principles) and [FAQ](https://testing-library.com/docs/dom-testing-library/faq). To read more about the React-specific part, go to [FAQ](https://testing-library.com/docs/react-testing-library/faq) or [Migrate from Enzyme](https://testing-library.com/docs/react-testing-library/migrate-from-enzyme). There is also [an example](https://testing-library.com/docs/react-testing-library/example-intro) of testing a React component.

Testing Library also provides a [user-event](https://testing-library.com/docs/user-event/intro/) companion library that simulates user interactions by dispatching the events that would happen if the interaction took place in a browser. Another useful companion library is [jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/) that provides [custom DOM element matchers](https://github.com/testing-library/jest-dom#custom-matchers) for Jest.

To configure code that executes before the tests run (e.g. to mock API or set global settings) take a look at [src/setupTests.ts](./src/setupTests.ts). There is also [src/testUtils.tsx](./src/testUtils.tsx) which provides custom render function for testing and wraps test with necessary providers.

## Linting & Formatting

Code quality concerns, best practices, possible logical issues etc. are checked by [ESLint](https://eslint.org/docs/latest/user-guide/). Our custom ESLint configuration [.eslintrc.js](./.eslintrc.js) includes these rules and plugins:

- built-in [ESLint recommended rules](https://github.com/eslint/eslint/blob/main/conf/eslint-recommended.js)
- [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) provides [recommended rules](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts), [type checking rules](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended-requiring-type-checking.ts) and [strict rules](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/strict.ts) for TypeScript
- [react](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/index.js#L126) provides React-specific rules
- [react-hooks](https://github.com/facebook/react/blob/main/packages/eslint-plugin-react-hooks/src/index.js#L14) enforces the [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html)
- [jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/src/index.js#L43) checkes for accessibility best practices in JSX
- [import](https://github.com/import-js/eslint-plugin-import/blob/main/config/recommended.js) validates proper ES module imports and exports, [also for TypeScript](https://github.com/import-js/eslint-plugin-import/blob/main/config/typescript.js)
- [unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/configs/recommended.js) provides additional powerful rules for more strict linting
- [eslint-comments](https://github.com/mysticatea/eslint-plugin-eslint-comments/blob/master/lib/configs/recommended.js) checks ESLint directive comments (e.g. `//eslint-disable-line`)
- [prettier](https://github.com/prettier/eslint-config-prettier/blob/main/index.js) turns off all stylistic rules that are unnecessary when using Prettier or might conflict with Prettier
- [testing-library](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/lib/configs/react.ts) checks for best practices and anticipates common mistakes when writing tests with Testing Library
- [jest-dom](https://github.com/testing-library/eslint-plugin-jest-dom/blob/main/src/index.js#L38) checks for best practices when writing tests with jest-dom

ESLint runs when:

- developer manually executes `yarn lint` command
- developer starts Vite dev server by `yarn start` command
- in IDE on background if supported ([VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), [IntelliJ IDEA](https://www.jetbrains.com/help/webstorm/eslint.html))
- automatically on `pre-commit` hook, right before code is committed
  - defining actions ([.husky/pre-commit](./.husky/pre-commit)) for git hooks is enabled by [Husky](https://github.com/typicode/husky)
  - linting only the files and changes being committed enables [lint-staged](https://github.com/okonet/lint-staged)
- during continuous integration defined in [.github/workflows/CI.yml](./.github/workflows/CI.yml)

Formatting of the entire codebase (js, ts, jsx, json, html, css, less, md...) is covered by [Prettier](https://prettier.io/docs/en/index.html). Prettier is an opinionated code formatter which removes original styling and ensures that outputted code conforms to a consistent style. This project uses mostly default Prettier configuration with a small exception defined in [.prettierrc](./.prettierrc). You can read more about it here: [Why Prettier](https://prettier.io/docs/en/why-prettier.html) and [Editors Integration](https://prettier.io/docs/en/editors.html).

Prettier runs when:

- developer manually executes `yarn format` command
- in IDE on file-save if configured ([VSCode](https://github.com/prettier/prettier-vscode), [IntelliJ IDEA](https://prettier.io/docs/en/webstorm.html))
- automatically on `pre-commit` hook, right before code is committed
- during CI

## UI Components

This project already includes [Ant Design](https://ant.design/), a design system and a UI components library for enterprise-level products developed by Alibaba / Alipay. It provides an extensive [set of UI components](https://ant.design/components/overview/) and an easy way of [customising the design](https://ant.design/docs/react/customize-theme). Just override the [default LESS variables](https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less) by editing the [src/app/styles/theme-variables.less](./src/app/styles/theme-variables.less).

[Global configuration](https://ant.design/components/config-provider/#API) for all components resides in [src/app/AntDesignConfig.tsx](./src/app/AntDesignConfig.tsx).

Ant Design includes a powerful [Form](https://ant.design/components/form/) component including validations. Reusable custom validation rules are defined in [src/common/validations.ts](./src/common/validations.ts) and are available via hook.

Ant Design provides several datetime related components which internally use [Moment.js](https://momentjs.com/) library. Moment.js is infamous for its huge size and will be dropped in the next major Ant Design release. Until then, Ant Design also supports other smaller datetime libraries such as [Day.js](https://day.js.org/) and allows us to [replace Moment.js](https://ant.design/docs/react/replace-moment) globally. This has already been done in this project using [moment-to-dayjs](https://github.com/Dunqing/unplugin-moment-to-dayjs) Vite plugin.

On top of that, this project already comes with [several components](./src/common/components/) built on top of Ant Design such as:

- [AdminLayout](./src/common/components/AdminLayout/) is a full-featured, responsive, dashboard layout with sidebar, navigation bar and space for page content
- [LoadingScreen](./src/common/components/LoadingScreen/index.tsx) is a full-page loader
- [Menu](./src/common/components/Menu/index.tsx) is a React Router aware menu showing [active link](./src/common/routerUtils.ts) based on the current location
- [Navbar](./src/common/components/Navbar/index.tsx) is a horizontal menu which changes itself to a hamburger menu for mobile devices
- [NotFound](./src/common/components/NotFound/index.tsx) is a 404 component
- [Widget](./src/common/components/Widget/index.tsx) encapsulates data and UI parts in a card-based component

All Less files in this project are being imported in the [src/app/styles/main.less](./src/app/styles/main.less) which itself is imported in [src/index.tsx](./src/index.tsx) to be processed by Vite and inserted into production `index.html` file.

## i18n

Internationalization is covered by the [i18next](https://www.i18next.com/) framework. i18next goes beyond just providing the standard i18n features such as (plurals, context, interpolation, format). It provides a complete solution to localize the product from web to mobile and desktop. It's framework and platform agnostic and it supports React, Angular, Vue, Nodejs, iOS and others. You can read more about its [benefits here](https://www.i18next.com/overview/comparison-to-others).

React support is provided by [react-i18next](https://react.i18next.com/). There is a short [comparison to react-i18n](https://react.i18next.com/guides/the-drawbacks-of-other-i18n-solutions) library and a [Step by step guide](https://react.i18next.com/latest/using-with-hooks). This project's i18next configuration is defined in [src/common/i18next.ts](./src/common/i18next.ts) and includes [i18next-http-backend](https://github.com/i18next/i18next-http-backend) for async loading of resources stored in [public/locales/{LANG}/translation.json](./public/locales/en/translation.json). IDE support is covered by TypeScript typings [src/i18n.d.ts](./src/i18n.d.ts).

i18next ecosystem provides [many more plugins and tools](https://www.i18next.com/overview/plugins-and-utils) to automate i18n management, to ease the cooperation between developers and translators, etc. This project includes one such plugin [i18next-parser](https://github.com/i18next/i18next-parser) to parse the codebase and extract translation keys into JSON resource file.

## React Router

A de facto standard for route management in React apps is a [React Router](https://reactrouter.com/). This project uses the newest v6 version which brings new features and removes some previously confusing concepts. It's best to read [Quick Start Overview](https://reactrouter.com/docs/en/v6/getting-started/overview) first, then proceed to [FAQ](https://reactrouter.com/docs/en/v6/getting-started/faq) mostly related to v6 changes. The documentation also provides a simple [Tutorial](https://reactrouter.com/docs/en/v6/getting-started/tutorial). To improve understanding of concepts, vocabulary, and design principles of React Router, go to the [Main Concepts](https://reactrouter.com/docs/en/v6/getting-started/concepts).

React Router lacks some accessibility features such as resetting scroll and focus after push, restoring scroll and focus after pop, scrolling down to the element identified by the hash fragment, or announcing navigation to screen reader users. All of this is provided by [oaf-react-router](https://github.com/oaf-project/oaf-react-router) library already included in this project. It works by wrapping the `history` object with oaf-react-router's function in [src/app/Router.tsx](./src/app/Router.tsx) and supplying the wrapped `history` object to the React Router.

To easily observe and debug the routing functionality during development, there is `RouterDebugObserver` in [src/app/Router.tsx](./src/app/Router.tsx) which logs all location changes such as push, pop, and replace.

## State Management

This project doesn't include [Redux](https://react-redux.js.org/) library. It has a lot of pros and cons but it isn't a silver bullet for state management in every application. It increases the complexity by bringing new concepts and patterns to the table. It requires several other companion libraries and lots of boilerplate. There is no data encapsulation and it's hard to achieve type-safety. Also, it isn't particularly useful when the app uses one data source per view and is often misused as an "API data cache". However, if you really need or want to use it, feel free to do so.

Using only the built-in [React Context](https://reactjs.org/docs/context.html) and [useState hook](https://reactjs.org/docs/hooks-state.html) can get out of hand quickly in mid-size application. Therefor some state management library with higher abstraction is necessary. The [Recoil](https://recoiljs.org/) state management library built by Facebook seems to be the best choice.

Recoil leverages [React-like approach and the same mental model](https://recoiljs.org/docs/introduction/motivation) and doesn't bring any new concepts or difficult patterns. It feels like using a global version of React's built-in useState hook. Recoil handles app-wide state observations well, it's boilerplate-free, supports [React v18 concurrency](https://reactjs.org/blog/2022/03/29/react-v18.html#what-is-concurrent-react) and encourages distributed and incremental state definition.

Recoil provides a data-graph that flows from shared states into React components. The two core concepts of Recoil according to the official [documentation](https://recoiljs.org/docs/introduction/core-concepts/) are:

- [Atoms](https://recoiljs.org/docs/introduction/core-concepts/#atoms) - units of the global state provided by Recoil. Components can access and subscribe to changes made to them.
- [Selectors](https://recoiljs.org/docs/introduction/core-concepts/#selectors) - can be used to transform states either synchronously or asynchronously. Components can also access and subscribe to them.

There is also a [To-Do list tutorial](https://recoiljs.org/docs/basic-tutorial/intro), a great [Explain Like I'm 5](https://www.youtube.com/watch?v=U9XStcquQyY) video, and a [Deep Dive](https://www.youtube.com/watch?v=_ISAA_Jt9kI) video.

To easily observe and debug state changes during development, there is `RecoilDebugObserver` in [src/app/Recoil.tsx](./src/app/Recoil.tsx) which logs all state changes.

This project also includes [recoil-persist](https://github.com/polemius/recoil-persist) for persisting and rehydrating Recoil state and [recoil-nexus](https://github.com/luisanton-io/recoil-nexus) as an escape hatch in case a Recoil state needs to be accessed outside of the React tree.

## Data Fetching and Network Communication

[SWR](https://swr.vercel.app/) library provides React hooks for data fetching inspired by stale-while-revalidate (a HTTP cache invalidation) strategy. SWR is a strategy to first return the data from cache (stale), then send the fetch request (revalidate), and finally come with the up-to-date data. With SWR library, components will get a stream of data updates constantly and automatically. And the UI will always be fast and reactive. Please read the [Getting Started](https://swr.vercel.app/docs/getting-started#make-it-reusable) for a simple usage example and comparison with non-SWR code.

SWR library is transport and protocol agnostic, it can be used by native [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), Axios, GraphQL library or any other asynchronous function which returns data. It provides built-in cache, request deduplication, polling on interval, [data dependency](https://swr.vercel.app/docs/conditional-fetching), [revalidation](https://swr.vercel.app/docs/revalidation) on focus or network recovery, [error retry](https://swr.vercel.app/docs/error-handling), [pagination](https://swr.vercel.app/docs/pagination), [optimistic UI](https://swr.vercel.app/docs/mutation), SSR support, [Suspense](https://swr.vercel.app/docs/suspense) support, and others.

This project configures SWR in [src/common/swr.ts](./src/common/swr.ts) with couple of middlewares. There is a `authMiddleware` which reads auth token and a `urlMiddleware` to build the API url based on host, endpoint and parameters. There is also a `fetcher` function based on [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) and an error handling.

To simplify showing the "loading" state across the whole application, there is a [useIsLoading](./src/common/hooks/useIsLoading.ts) hook. This function accepts a string `key` representing the API call or any other async operation. It returns `isLoading` boolean to show/hide loading component and a `wrap` function used to wrap the actual async function.

Network communicaton other then data fetching (or when SWR strategy is not useful) is facilitated by [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) based [src/common/apiClient.ts](./src/common/apiClient.ts). It provides async functions for each HTTP method (get, post, put, patch, delete), injects auth token automatically and includes error handling.

Real world usage examples of SWR, `apiClient` and `useIsLoading` can be found in [src/api/user.ts](./src/api/user.ts) and [src/api/auth.ts](./src/api/auth.ts).

## Authentication

A token-based API agnostic authentication is already included in this project. It resides in [src/common/auth](./src/common/auth) and provides 3 simple hooks: `useLogin` to do the log in, `useLogout` to do the log out and `useAuth` to get current information (`token`, `userId`, `isLoggedIn`).

It also provides 2 guard components, [RequireIsLoggedIn](./src/common/auth/RequireIsLoggedIn.tsx) and [RequireIsAnonymous](./src/common/auth/RequireIsAnonymous.tsx), to [wrap routes](./src/app/App.tsx). They will automatically redirect the user based on being authenticated or not.

There is also a [src/common/auth/PersistAuthGate.tsx](./src/common/auth/PersistAuthGate.tsx) to automatically re-login a user after the page reloads if token is present in local storage.

Internally, all auth state is stored by Recoil in [src/common/auth/state.ts](./src/common/auth/state.ts).

## React

React has [grown](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html) [significantly](https://reactjs.org/blog/2022/03/29/react-v18.html) in the last few years. [New concepts](https://reactjs.org/blog/2018/11/13/react-conf-recap.html) and patterns have emerged and were built into the framework. Here is the list of the most important ones:

- [Hooks](https://reactjs.org/docs/hooks-intro.html) are explained in detail [below](#react-hooks)
- [Context](https://reactjs.org/docs/context.html) provides a way to pass data through the component tree without having to pass props down manually at every level (prop drilling)
- [Error Boundaries](https://reactjs.org/docs/error-boundaries.html) catch JS errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. This project also includes [react-error-boundary](https://github.com/bvaughn/react-error-boundary) library providing better and reusable `ErrorBoundary` component
- [Code Splitting](https://reactjs.org/docs/code-splitting.html) to avoid winding up with a large JS bundle
- [Transitions](https://reactjs.org/docs/react-api.html#transitions) allow you to mark updates as transitions, which tells React that they can be interrupted and avoid going back to Suspense fallbacks for already visible content
- [Concurrent React](https://reactjs.org/blog/2022/03/29/react-v18.html#what-is-concurrent-react)

### React Hooks

[Hooks](https://reactjs.org/docs/hooks-intro.html) replace all the patterns for stateful logic reuse such as [render props](https://reactjs.org/docs/render-props.html), [higher-order components](https://reactjs.org/docs/higher-order-components.html), and other abstractions. With Hooks, we can extract stateful logic from a component so it can be tested independently and reused without changing the component hierarchy.

Hooks also help to avoid complex components that are hard to understand. Traditionally, a class component mixes stateful logic, side effects and UI. It is done using lifecycle methods which combine mix of unrelated code (data fetching, event listeners setup) in a single method while splitting related code (event listeners cleanup) to different lifecycle methods. This leads to bugs, makes it difficult to split large components into smaller ones because stateful logic is all over the place, and it is hard to cover such component with tests. With Hooks, we can split one component into smaller functions based on what pieces are related (such as setting up a subscription or fetching data), rather than forcing a split based on lifecycle methods.

Hooks also make class components obsolete. They are often a barrier to learning React. In JavaScript, [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) keyword works very differently from how it works in most languages. Classes also make events binding "difficult", they don't minify very well and make hot reloading unreliable.

To start using hooks, read [Hooks at a Glance](https://reactjs.org/docs/hooks-overview.html), [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html) and [FAQ](https://reactjs.org/docs/hooks-faq.html).

React has several built-in hooks such as:

- [useState](https://reactjs.org/docs/hooks-state.html) allows for state management in function component and replaces `this.setState` and `this.state`
- [useEffect](https://reactjs.org/docs/hooks-effect.html) allows performing side effects in function components and replaces `componentDidMount`, `componentDidUpdate` and `componentWillUnmount`
- [useContext](https://reactjs.org/docs/hooks-reference.html#usecontext) allows using React Context in function component
- [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer), [useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback), [useMemo](https://reactjs.org/docs/hooks-reference.html#usememo) and [others](https://reactjs.org/docs/hooks-reference.html)

The best part is that developers can [build their own](https://reactjs.org/docs/hooks-custom.html) hooks to extract component logic into reusable functions.

## Project structure

```
├── .github/ : GitHub workflows for CI/CD
├── .husky/ : Git hooks e.g. the pre-commit hook
├── public/ : Public static assets
├── src/
│   ├── api/ : Communication with API server
│   ├── app/ : Application-wide (framework) files e.g. providers, top-router or global styles
│   ├── common/ : Reusable functionality
│   │   ├── auth/ : Authentication related logic
│   │   ├── components/ : Generic UI components
│   │   ├── hooks/ : Generic React hooks
│   ├── features/ : Features bundled into separate modules including components, containers, routes etc.
│   ├── i18n.d.ts : Typing for i18n keys
│   ├── index.tsx : Application entry file
│   ├── setupTests.tsx : Executes before tests to mock API or set global settings
│   ├── testUtils.tsx : Provides custom render function for testing
│   ├── vite-env.d.ts : Vite specific typings e.g. environment values
├── .editorconfig : helps maintain consistent coding style across various IDEs and [works well](https://prettier.io/docs/en/configuration.html#editorconfig) with Prettier
├── .env : contains environment variables [consumed by Vite](https://vitejs.dev/guide/env-and-mode.html)
├── .eslintignore : to ignore files when running ESLint
├── .eslintrc.js : contains ESLint [configuration](https://eslint.org/docs/latest/user-guide/configuring/)
├── .prettierignore : to ignore files when running Prettier
├── .prettierrc : contains Prettier [configuration](https://prettier.io/docs/en/options.html)
├── i18next-parser.config.js : contains configuration for [i18next-parser](https://github.com/i18next/i18next-parser)
├── index.html : is the entry point to the application
├── renovate.json : contains configuration for [Renovate](https://github.com/renovatebot/renovate) to keep dependencies up-to-date
├── tsconfig.json : contains TypeScript [configuration](https://www.typescriptlang.org/tsconfig/) for application running in browser
├── tsconfig.vite.json : contains TypeScript [configuration](https://www.typescriptlang.org/tsconfig/) for running Vite locally in Node.js
├── vite.config.ts : contains Vite [configuration](https://vitejs.dev/config/)
├── yarn.lock : auto-generated file to keep dependency versions, should be handled entirely by Yarn
```

The entrypoint to the application is [src/index.tsx](./src/index.tsx). It includes styles, initializes i18n resources and renders [src/app/Root.tsx](./src/app/Root.tsx) into html.

[Root.tsx](./src/app/Root.tsx) is a root React component. It renders all the application-wide providers such as Recoil, SWR, Router, and Ant Design. It also contains one app-wide Error Boundary and Suspense component. Wrapped inside all that is an [src/app/App.tsx](./src/app/App.tsx).

The actual business logic starts at [App.tsx](./src/app/App.tsx) file. Top routes such as auth routes and dashboard routes are rendered there based on a user being logged-in or anonymous. Components for these routes are coming from [src/features](./src/features) folder.

The [src/features](./src/features) folder contains encapsulated features / parts / modules of the application. Every feature contains everything specific to that feature e.g. routing, containers, components, styles, tests and even its sub-features encapsulated in the nested `features` folder. The [src/features](./src/features) folder structure is up to the development team, however, it's good to follow these principles:

- make components, hooks and the rest of the code reusable, if possible, and move it up to [src/common/components](./src/common/components), [src/common/hooks](./src/common/hooks) or other folder
- keep router code close to pages that are being rendered by these routes e.g. [src/features/auth/index.ts](./src/features/auth/index.tsx) and [src/features/auth/routes.ts](./src/features/auth/routes.ts)
- keep styles close to components they belong to
- you can split a single feature e.g. [src/features/dashboard](./src/features/dashboard) into several nested features e.g. [src/features/dashboard/features/profile](./src/features/dashboard/features/profile)
- you can split components to "presentational" (let's call them dumb or just components) and "structural" (let's call them smart or containers). Both could be either stateful or stateless. There is an article [Not All Components Are Created Equal](https://formidable.com/blog/2021/react-components/) which outlines options to structure components.
