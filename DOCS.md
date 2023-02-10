# Documentation

This project is based on couple of dependencies. It's advised to read through their documentations to understand their basic principles and capabilities.

Here is the list of selected documentation pages and other resources containing the most important and high-level information about these dependencies.

## Building

Build tooling for both development and production is provided by [Vite](https://vitejs.dev/). It's a replacement for the traditional Webpack/Babel setup created by [Evan You](https://evanyou.me/) (author of Vue.js). Thanks to the plugin system, it provides all the features that a frontend tooling might require without the need for a complex configuration. It is also significantly (100x) faster than Webpack/Babel for both development and production building.

It's best to start with this video [Vite in 100 Seconds](https://www.youtube.com/watch?v=KCrXgy8qtjM). You can continue with [Why Vite](https://vitejs.dev/guide/why.html) and its [Features](https://vitejs.dev/guide/features.html). There is also a [good article from Shopify Engineering](https://shopify.engineering/developer-experience-with-hydrogen-and-vite) about why they chose Vite for building Shopify frontends.

Vite configuration [vite.config.ts](./vite.config.ts) in this project also uses plugins for [React](https://github.com/vitejs/vite/tree/main/packages/plugin-react), [SVG components](https://github.com/pd4d10/vite-plugin-svgr), checking [TS types](https://vite-plugin-checker.netlify.app/checkers/typescript.html) and [ESLint](https://vite-plugin-checker.netlify.app/checkers/eslint.html), resolving [TS path mappings](https://github.com/aleclarson/vite-tsconfig-paths), and [Emotion](https://emotion.sh/) CSS in JS.

This project is also entirely written in [TypeScript](https://www.typescriptlang.org/), a strongly typed programming language that builds on JavaScript. There is a good Get Started both for [JavaScript programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) and [Java Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-oop.html). The TS compiler options are defined in [tsconfig.json](./tsconfig.json).

## Testing

### Vitest

Testing a Vite based project is easiest with [Vitest](https://vitest.dev/) which uses the same configuration (through [vite.config.ts](./vite.config.ts)), sharing a common transformation pipeline during development, build, and test time. Vitest is a [Jest](https://jestjs.io/) drop-in replacement with the same API using the same libraries under the hood. Please read [Why Vitest](https://vitest.dev/guide/why.html) and [Comparison with Jest](https://vitest.dev/guide/comparisons.html#jest) to understand the need for migration from Jest to Vitest and its benefits. Here is a handy summary of its [Features](https://vitest.dev/guide/features.html) and [IDE Integration](https://vitest.dev/guide/ide.html) with IntelliJ IDEA and VSCode.

Vitest also provides a [neat UI](https://vitest.dev/guide/ui.html) to view and interact with the tests. Open it by running `npm run test:ui`.

### Testing Library

Generally an [Enzyme](https://github.com/enzymejs/enzyme) library was used for testing React components. However [Enzyme is dead](https://dev.to/wojtekmaj/enzyme-is-dead-now-what-ekl), its last commit is from [09/21](https://github.com/enzymejs/enzyme/commits/master) and it doesn't work for [React v17](https://github.com/enzymejs/enzyme/issues/2429) nor [React v18](https://github.com/enzymejs/enzyme/issues/2524). For projects with hundreds/thousands of Enzyme based tests, this is a disaster. Although it isn't such a bad thing for new projects. Enzyme encouraged bad testing practices e.g. [shallow rendering](https://kentcdodds.com/blog/why-i-never-use-shallow-rendering) and [testing implementation details](https://kentcdodds.com/blog/testing-implementation-details) such as internal state, internal methods of the component, its lifecycle methods, and children.

There is a better alternative ([recommended by React](https://reactjs.org/docs/testing.html#tools)) for testing frontend applications called [Testing Library](https://testing-library.com/). It's framework agnostic and officially supports testing plain DOM, React, React Native, Angular, Vue, Marko, Svelte, Preact, and many others. It encourages good testing practices and follows the principle of "The more your tests resemble the way your software is used, the more confidence they provide". It enables the developer to write unit tests, integration tests, and e2e tests. You can read more in the [Introduction](https://testing-library.com/docs/), [Guiding Principles](https://testing-library.com/docs/guiding-principles) and [FAQ](https://testing-library.com/docs/dom-testing-library/faq). To read more about the React-specific part, go to [FAQ](https://testing-library.com/docs/react-testing-library/faq) or [Migrate from Enzyme](https://testing-library.com/docs/react-testing-library/migrate-from-enzyme). There is also [an example](https://testing-library.com/docs/react-testing-library/example-intro) of testing a React component.

Testing Library also provides a [user-event](https://testing-library.com/docs/user-event/intro/) companion library that simulates user interactions by dispatching the events that would happen if the interaction took place in a browser. Another useful companion library is [jest-dom](https://testing-library.com/docs/ecosystem-jest-dom/) that provides [custom DOM element matchers](https://github.com/testing-library/jest-dom#custom-matchers) for Jest.

### MSW

[Mock Service Worker](https://mswjs.io/) mocks APIs by intercepting requests on the network level. It allows a developer to seamlessly reuse the same API mock definition for testing, development, and debugging. It keeps application's code and tests unaware whether something is mocked or not. MSW uses [declarative request handlers](./src/mocks/handlers.ts) to capture requests and provide a response resolver function that returns a mocked response. It works only during development and testing and [doesn't get bundled](./src/index.tsx) into the production code.

### Configuration

To configure code that executes before the tests run (e.g. to mock API or set global settings) take a look at [src/tests/setup.ts](./src/tests/setup.ts). It currently:

- polyfills `fetch` API
- polyfills `window.matchMedia` and sets window width to 1200px
- initializes `i18next`
- extends Vitest matchers with [@testing-library/jest-dom](https://www.npmjs.com/package/@testing-library/jest-dom)
- setups MSW to mock API

There is also [src/tests/utils.tsx](./src/tests/utils.tsx) which provides custom render function for testing and wraps test with necessary providers such as react-query, Recoil, Ant, Emotion, Router... It also re-exports everything related to `testing-library`.

Currently there is [only 1 test](./src/app/App.test.tsx) which is basically a "smoke test". It makes sure that the app renders without crashing and tests a happy path of Sign up -> Login -> Logout.

## Linting & Formatting

### ESLint

Code quality concerns, best practices, possible logical issues etc. are checked by [ESLint](https://eslint.org/docs/latest/user-guide/). Our custom ESLint configuration [.eslintrc.js](./.eslintrc.js) includes these rules and plugins:

- built-in [ESLint recommended rules](https://github.com/eslint/eslint/blob/main/conf/eslint-recommended.js)
- [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) provides [recommended rules](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts), [type checking rules](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended-requiring-type-checking.ts) and [strict rules](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/strict.ts) for TypeScript
- [react](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/index.js#L126) provides React-specific rules
- [react-hooks](https://github.com/facebook/react/blob/main/packages/eslint-plugin-react-hooks/src/index.js#L14) enforces the [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html)
- [jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/src/index.js#L43) checkes for accessibility best practices in JSX
- [import](https://github.com/import-js/eslint-plugin-import/blob/main/config/recommended.js) validates proper ES module imports and exports, [also for TypeScript](https://github.com/import-js/eslint-plugin-import/blob/main/config/typescript.js)
- [unicorn](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/configs/recommended.js) provides additional powerful rules for more strict linting
- [@tanstack/eslint-plugin-query](https://tanstack.com/query/v4/docs/eslint/eslint-plugin-query) enforces best practices and avoids common mistakes when using react-query
- [@emotion/eslint-plugin](https://github.com/emotion-js/emotion/tree/main/packages/eslint-plugin) enforces css-in-js styles written as objects
- [eslint-comments](https://github.com/mysticatea/eslint-plugin-eslint-comments/blob/master/lib/configs/recommended.js) checks ESLint directive comments (e.g. `//eslint-disable-line`)
- [prettier](https://github.com/prettier/eslint-config-prettier/blob/main/index.js) turns off all stylistic rules that are unnecessary when using Prettier or might conflict with Prettier
- [testing-library](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/lib/configs/react.ts) checks for best practices and anticipates common mistakes when writing tests with Testing Library
- [jest-dom](https://github.com/testing-library/eslint-plugin-jest-dom/blob/main/src/index.js#L38) checks for best practices when writing tests with jest-dom

ESLint runs when:

- developer manually executes `npm run lint` command
- developer starts Vite dev server by `npm start` command
- in IDE on background if supported ([VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint), [IntelliJ IDEA](https://www.jetbrains.com/help/webstorm/eslint.html))
- automatically on `pre-commit` hook, right before code is committed
  - defining actions ([.husky/pre-commit](./.husky/pre-commit)) for git hooks is enabled by [Husky](https://github.com/typicode/husky)
  - linting only the files and changes being committed enables [lint-staged](https://github.com/okonet/lint-staged)
- during continuous integration defined in [.github/workflows/CI.yml](./.github/workflows/CI.yml)

### Prettier

Formatting of the entire codebase (js, ts, jsx, json, html, css, md...) is covered by [Prettier](https://prettier.io/docs/en/index.html). Prettier is an opinionated code formatter which removes original styling and ensures that outputted code conforms to a consistent style. This project uses mostly default Prettier configuration with a small exception defined in [.prettierrc](./.prettierrc). You can read more about it here: [Why Prettier](https://prettier.io/docs/en/why-prettier.html) and [Editors Integration](https://prettier.io/docs/en/editors.html).

Prettier runs when:

- developer manually executes `npm run format` command
- in IDE on file-save if configured ([VSCode](https://github.com/prettier/prettier-vscode), [IntelliJ IDEA](https://prettier.io/docs/en/webstorm.html))
- automatically on `pre-commit` hook, right before code is committed
- during CI

## UI Components

This project already includes [Ant Design](https://ant.design/), a design system and a UI components library for enterprise-level products developed by Alibaba / Alipay. It provides an extensive [set of UI components](https://ant.design/components/overview/) and an easy way of [customising the design](https://ant.design/docs/react/customize-theme) using themes.

This projects comes with 2 themes: default and dark. To customize these themes, override the theme tokens in [src/app/theme/baseConfig.ts](./src/app/theme/baseConfig.ts) and [src/app/theme/darkConfig.ts](./src/app/theme/darkConfig.ts) respectively. The full list of theme tokens is available in [Ant Design documentation](https://ant.design/docs/react/customize-theme#theme). Ant Design provides a [Theme Editor](https://ant.design/theme-editor/) to help you create your own theme. Global styles are defined in [src/app/theme/GlobalStyles.tsx](./src/app/theme/GlobalStyles.tsx).

Currently selected theme is stored in Recoil state and can be retrieved using [useIsDark()](./src/app/theme/ThemeProvider.tsx) hook. The theme can be changed using the [src/app/theme/ThemeSwitch.tsx](./src/app/theme/ThemeSwitch.tsx).

[Global configuration](https://ant.design/components/config-provider/#API) for all components resides in [src/app/providers/AntDesign.tsx](./src/app/providers/AntDesign.tsx).

Ant Design includes a powerful [Form](https://ant.design/components/form/) component including input validations. Validation utilities and reusable validation rules are defined in [src/common/validations.ts](./src/common/validations.ts). Feature-specific validations are defined in the feature folder such as [src/features/auth/validations.ts](./src/features/auth/validations.ts).

On top of that, this project already comes with [several components](./src/common/components/) built on top of Ant Design such as:

- [AdminLayout](./src/common/components/AdminLayout/) is a full-featured, responsive, dashboard layout with sidebar, navigation bar and space for page content
- [LoadingScreen](./src/common/components/LoadingScreen/index.tsx) is a full-page loader
- [Logo](./src/common/components/Logo/index.tsx) is a simple logo component
- [Menu](./src/common/components/Menu/index.tsx) is a React Router aware menu showing [active link](./src/common/routerUtils.ts) based on the current location
- [Navbar](./src/common/components/Navbar/index.tsx) is a horizontal menu which changes itself to a hamburger menu for mobile devices
- [NotFound](./src/common/components/NotFound/index.tsx) is a 404 component
- [PageHeader](./src/common/components/PageHeader/index.tsx) is a simplified version of [Ant v4 PageHeader](https://4x.ant.design/components/page-header/) component which was removed from Ant v5
- [ResultError](./src/common/components/ResultError/index.tsx) is an error component for both API and client-side errors
- [Widget](./src/common/components/Widget/index.tsx) encapsulates data and UI parts in a card-based component

## Styling using Emotion (css-in-js)

[Emotion](https://emotion.sh/docs) is a library designed for writing css styles with JavaScript. It provides powerful and predictable style composition in addition to a great developer experience with features such as source maps, labels, and testing utilities. The primary way to style elements with emotion is [the css prop](https://emotion.sh/docs/css-prop). It provides a concise and flexible API to style your components. In this project we use ESLint rule to only allow [objects for defining styles](https://emotion.sh/docs/object-styles). You can read more about [Best Practices](https://emotion.sh/docs/best-practices) [classNames](https://emotion.sh/docs/class-names).

The [Emotion Theme](https://emotion.sh/docs/theming) is provided by the [src/app/theme/ThemeProvider.tsx](./src/app/theme/ThemeProvider.tsx) and typed by [src/app/theme/types.d.ts](./src/app/theme/types.d.ts). It includes the full Ant's theme `token` and `isDark` flag to indicate which theme is currently being used. Emotion styles can access this `Theme` context using the `createStyles()` helper function.

There is also [src/common/styleUtils.ts](./src/common/styleUtils.ts) which contains some useful functions for styling such as:

- `createStyles()` is a helper for accessing the `Theme` context (`token`, `isDark`) in Emotion styles
- `getMQ()` is a helper for writing media queries in Emotion styles
- `useBreakpoint()` is a re-export of Ant's [Grid.useBreakpoint hook](https://ant.design/components/grid#components-grid-demo-usebreakpoint)
- `centeredCss` is a style for centering content
- `fullVPHeightCss` is a style for making an element full viewport height.

## i18n

Internationalization is covered by the [i18next](https://www.i18next.com/) framework. i18next goes beyond just providing the standard i18n features such as (plurals, context, interpolation, format). It provides a complete solution to localize the product from web to mobile and desktop. It's framework and platform agnostic and it supports React, Angular, Vue, Nodejs, iOS and others. You can read more about its [benefits here](https://www.i18next.com/overview/comparison-to-others).

React support is provided by [react-i18next](https://react.i18next.com/). There is a short [comparison to react-i18n](https://react.i18next.com/guides/the-drawbacks-of-other-i18n-solutions) library and a [Step by step guide](https://react.i18next.com/latest/using-with-hooks). This project's i18next configuration is defined in [src/i18n/index.ts](./src/i18n/index.ts). Translations in form of JSON files are located in `src/i18n/{language}/{namespace}.json`. IDE support is covered by TypeScript typings [src/i18n/types.d.ts](./src/i18n/types.d.ts).

i18next ecosystem provides [many plugins and tools](https://www.i18next.com/overview/plugins-and-utils) to automate i18n management, to ease the cooperation between developers and translators, etc. This project includes one such plugin [i18next-parser](https://github.com/i18next/i18next-parser) to parse the codebase and extract translation keys into JSON resource file.

## React Router

A de facto standard for route management in React apps is a [React Router](https://reactrouter.com/). This project uses the newest v6 version which brings new features and removes some previously confusing concepts. It's best to read [Quick Start Overview](https://reactrouter.com/docs/en/v6/getting-started/overview) first, then proceed to [FAQ](https://reactrouter.com/docs/en/v6/getting-started/faq) mostly related to v6 changes. The documentation also provides a simple [Tutorial](https://reactrouter.com/docs/en/v6/getting-started/tutorial). To improve understanding of concepts, vocabulary, and design principles of React Router, go to the [Main Concepts](https://reactrouter.com/docs/en/v6/getting-started/concepts).

Generation of breadcrumbs is covered by [use-react-router-breadcrumbs](https://github.com/icd2k3/use-react-router-breadcrumbs) and used in [src/features/dashboard/components/DashboardPageHeader/index.tsx](./src/features/dashboard/components/DashboardPageHeader/index.tsx).

## State Management

This project doesn't include [Redux](https://react-redux.js.org/) library. It has a lot of pros and cons but it isn't a silver bullet for state management in every application. It increases the complexity by bringing new concepts and patterns to the table. It requires several other companion libraries and lots of boilerplate. There is no data encapsulation and it's hard to achieve type-safety. Also, it isn't particularly useful when the app uses one data source per view and is often misused as an "API data cache". However, if you really need or want to use it, feel free to do so.

Using only the built-in [React Context](https://reactjs.org/docs/context.html) and [useState hook](https://reactjs.org/docs/hooks-state.html) can get out of hand quickly in mid-size application. Therefor some state management library with higher abstraction is necessary. The [Recoil](https://recoiljs.org/) state management library built by Facebook seems to be the best choice.

Recoil leverages [React-like approach and the same mental model](https://recoiljs.org/docs/introduction/motivation) and doesn't bring any new concepts or difficult patterns. It feels like using a global version of React's built-in useState hook. Recoil handles app-wide state observations well, it's boilerplate-free, supports [React v18 concurrency](https://reactjs.org/blog/2022/03/29/react-v18.html#what-is-concurrent-react) and encourages distributed and incremental state definition.

Recoil provides a data-graph that flows from shared states into React components. The two core concepts of Recoil according to the official [documentation](https://recoiljs.org/docs/introduction/core-concepts/) are:

- [Atoms](https://recoiljs.org/docs/introduction/core-concepts/#atoms) - units of the global state provided by Recoil. Components can access and subscribe to changes made to them.
- [Selectors](https://recoiljs.org/docs/introduction/core-concepts/#selectors) - can be used to transform states either synchronously or asynchronously. Components can also access and subscribe to them.

There is also a [To-Do list tutorial](https://recoiljs.org/docs/basic-tutorial/intro), a great [Explain Like I'm 5](https://www.youtube.com/watch?v=U9XStcquQyY) video, and a [Deep Dive](https://www.youtube.com/watch?v=_ISAA_Jt9kI) video.

To easily observe and debug state changes during development, there is `RecoilDebugObserver` in [src/app/providers/Recoil.tsx](./src/app/providers/Recoil.tsx) which logs all state changes.

This project also includes [recoil-persist](https://github.com/polemius/recoil-persist) for persisting and rehydrating Recoil state and [recoil-nexus](https://github.com/luisanton-io/recoil-nexus) as an escape hatch in case a Recoil state needs to be accessed outside of the React tree.

## Data Fetching and Mutating

[React Query](https://tanstack.com/query/) is an asynchronous state management library for React. It gives us declarative, always-up-to-date, auto-managed [queries](https://tanstack.com/query/v4/docs/guides/queries) and [mutations](https://tanstack.com/query/v4/docs/guides/mutations) that directly improve both the developer and user experiences. We only have to specify [where to get the data](https://tanstack.com/query/v4/docs/guides/query-functions) and how fresh we need them to be and the rest is automatic. It handles [caching](https://tanstack.com/query/v4/docs/guides/caching), [background updates](https://tanstack.com/query/v4/docs/guides/background-fetching-indicators) and stale data. There's no global state to manage, reducers, normalization systems or heavy configurations to understand. It works out of the box with [zero-configuration](https://tanstack.com/query/v4/docs/guides/important-defaults) but it's also configurable down to each observer instance of a query with knobs and options to fit every use-case. It comes wired up with dedicated [devtools](https://tanstack.com/query/v4/docs/devtools), [pagination](https://tanstack.com/query/v4/docs/guides/paginated-queries), [infinite-loading](https://tanstack.com/query/v4/docs/guides/infinite-queries) APIs, [error retries](https://tanstack.com/query/v4/docs/guides/query-retries), first class mutation tools for updating the data, [optimistic updates](https://tanstack.com/query/v4/docs/guides/optimistic-updates), and many other features.

In the previous section ([State Management](#state-management)) we mentioned that Redux is often misused as an "API data cache". React Query library is basically replacing Redux for this use-case. You can read more about it here: "[Does React Query replace client state](https://tanstack.com/query/v4/docs/guides/does-this-replace-client-state)", "[Why I Stopped Using Redux](https://dev.to/g_abud/why-i-quit-redux-1knl)", and [It’s Time to Break up with your Global State](https://www.youtube.com/watch?v=seU46c6Jz7E).

If you want to read more about React Query there is an [extensive documentation](https://tanstack.com/query/v4/docs/overview) and a series of blog posts "[Practical React Query](https://tkdodo.eu/blog/practical-react-query)".

In [src/app/providers/Query.tsx](./src/app/providers/Query.tsx) there is a React Query provider to which you can pass custom configuration. It also includes dedicated Devtools for easy visualisation and debugging of queries.

A [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)-based [src/api/client.ts](./src/api/client.ts) is provided to the React Query hooks. You can see its usage in [src/api/user.ts](./src/api/user.ts) and [src/api/auth.ts](./src/api/auth.ts).

Thanks to the [zod](https://github.com/colinhacks/zod) schema validation library, we can also type-check the data returned from the API to ensure that it matches the expected shape. You can read more about this idea in the "[Type-Safe React Query](https://tkdodo.eu/blog/type-safe-react-query#trust-again)" and "[https://timdeschryver.dev/blog/why-we-should-verify-http-response-bodies-and-why-we-should-use-zod-for-this](Why we should verify HTTP response bodies)" posts.

## Authentication

A token-based API agnostic authentication is already included in this project. It resides in [src/common/auth](./src/common/auth) and provides a `useAuth` hook. This hook returns current auth state (`token`, `userId`, `isLoggedIn`, and loading indicators), `login` method to perform a login operation, `relogin` method to renew the token, and `logout` method to perform a logout operation.

It also provides 2 guard components, [RequireIsLoggedIn](./src/common/auth/RequireIsLoggedIn.tsx) and [RequireIsAnonymous](./src/common/auth/RequireIsAnonymous.tsx), to [wrap routes](./src/app/App.tsx). They will automatically redirect the user based on being authenticated or not.

It also provides `getToken` method which servers as an escape hatch in case we need to get JWT token outside of React components. This is in fact used in [src/api/common.ts](./src/api/common.ts) to inject token to API call headers.

Internally, all auth state is stored by Recoil in [src/common/auth/state.ts](./src/common/auth/state.ts). The JWT token is persisted in `localStorage` using the [recoil-persist](https://github.com/polemius/recoil-persist) library.

There is also a [src/app/PersistAuthGate.tsx](./src/app/PersistAuthGate.tsx) to automatically re-login a user after the page reloads if token is present in `localStorage`.

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
├── .vscode/ : VSCode configuration
├── public/ : Public static assets
├── src/
│   ├── api/ : Communication with API server
│   ├── app/ : Application-wide (framework) files
│   │   ├── providers/ : providers for AntD, Recoil, Query
│   │   ├── theme/ : customising AntD theme, Dark mode, global styles, Emotion setup
│   ├── common/ : Reusable functionality
│   │   ├── auth/ : Authentication related logic
│   │   ├── components/ : Generic UI components
│   │   ├── hooks/ : Generic React hooks
│   ├── features/ : Features bundled into separate modules
│   ├── i18n/ : i18n configuration and translation JSON files
│   ├── mocks/ : API mocks by [MSW](https://mswjs.io/)
│   ├── tests/ : Testing related functionality
│   │   ├── setup.tsx : Executes before tests to mock API or set global settings
│   │   ├── utils.tsx : Provides custom render function for testing
│   ├── index.tsx : Application entry file
│   ├── vite-env.d.ts : Vite specific typings e.g. environment values
├── .editorconfig : helps maintain consistent coding style across various IDEs and [works well](https://prettier.io/docs/en/configuration.html#editorconfig) with Prettier
├── .env : contains environment variables [consumed by Vite](https://vitejs.dev/guide/env-and-mode.html)
├── .eslintignore : to ignore files when running ESLint
├── .eslintrc.js : contains ESLint [configuration](https://eslint.org/docs/latest/user-guide/configuring/)
├── .gitignore : to keep Git from tracking specific files
├── .prettierignore : to ignore files when running Prettier
├── .prettierrc : contains Prettier [configuration](https://prettier.io/docs/en/options.html)
├── i18next-parser.config.js : contains configuration for [i18next-parser](https://github.com/i18next/i18next-parser)
├── index.html : is the entry point to the application
├── mockServiceWorker.js : part of [MSW library](https://mswjs.io/docs/faq#why-do-i-see-the-detected-outdated-service-worker-error-in-my-console)
├── package.json : holds metadata about the project and its dependencies
├── package-lock.json : auto-generated file to keep dependency versions, should be handled entirely by npm
├── renovate.json : contains configuration for [Renovate](https://github.com/renovatebot/renovate) to keep dependencies up-to-date
├── tsconfig.json : contains TypeScript [configuration](https://www.typescriptlang.org/tsconfig/) for application running in browser
├── tsconfig.vite.json : contains TypeScript [configuration](https://www.typescriptlang.org/tsconfig/) for running Vite locally in Node.js
├── vite.config.ts : contains Vite [configuration](https://vitejs.dev/config/)
```

The entrypoint to the application is [src/index.tsx](./src/index.tsx). It includes styles, initializes i18n resources and renders [src/app/Root.tsx](./src/app/Root.tsx) into html.

[Root.tsx](./src/app/Root.tsx) is a root React component. It renders all the application-wide providers such as [Recoil](././src/app/providers/Recoil.tsx), [AntDesign](./src/app/providers/AntDesign.tsx), [Query](././src/app/providers/Query.tsx), and Router. It also includes [GlobalErrorBoundary](./src/app/GlobalErrorBoundary.tsx) as a last instance for catching errors and a Suspense with global loading indicator. Wrapped inside all of that is an [src/app/App.tsx](./src/app/App.tsx).

The actual business logic starts at [App.tsx](./src/app/App.tsx) file. Top routes such as auth routes and dashboard routes are rendered there based on a user being logged-in or anonymous. Components for these routes are coming from [src/features](./src/features) folder.

The [src/features](./src/features) folder contains encapsulated features / parts / modules of the application. Every feature contains everything specific to that feature e.g. routing, components, styles, tests and even its sub-features encapsulated in the nested `features` folder. The [src/features](./src/features) folder structure is up to the development team, however, it's good to follow these principles:

- make components, hooks and the rest of the code reusable, if possible, and move it up to [src/common/components](./src/common/components), [src/common/hooks](./src/common/hooks) or other folder
- keep router code close to pages that are being rendered by these routes e.g. [src/features/auth/index.ts](./src/features/auth/index.tsx) and [src/features/auth/routes.ts](./src/features/auth/routes.ts)
- keep styles and assets close to components they belong to
- you can split a single feature e.g. [src/features/dashboard](./src/features/dashboard) into several nested features e.g. [src/features/dashboard/features/profile](./src/features/dashboard/features/profile)
