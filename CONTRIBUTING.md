# Coding Styleguide

Here we suggest several best-practices which you should follow.
We believe that using these conventions you keep your project healthy & maintanable by having a readable codebase.

This document is written on the fly, it's far from being a complete coding styleguide.

# TypeScript

## Uppercase constants

Names of constants should be UPPERCASE so we can easily distinguish them from local variables.

✅

```ts
export const TABS = {
  PENDING: 'Pending',
  RESOLVED: 'Resolved',
};
```

❌

```ts
export const tabs = {
  Pending: 'Pending',
  Resolved: 'Resolved',
};
```

## Function naming

In functional programming we use simple functions such as `create`, `select` or `render`. When having a specific version of those,
always keep the base name as a prefix of the function. Avoid anthropomorphic names which are common in object-oriented programming.

✅

```tsx
const renderActions = () => (
  <>
    <DeleteButton />
    <EditButton />
  </>
);

const selectUsername = (state) => state.user.name;
```

❌

```tsx
const actionsRendered = () => (
  <>
    <DeleteButton />
    <EditButton />
  </>
);

const usernameSelector = (state) => state.user.name;
```

It follows, that when you call a function, you can name the result (more or less) as the function name without the base name:

✅

```ts
const userName = selectUsername(state); // returns string
const userActions = renderUserActions(this.props.user); // returns react element
const reloginAction = createActionCreator(RELOGIN); // returns object
```

## Imports ordering

Order imports of dependencies by their reusability level.

1. External (npm) libraries
2. Common (project-wide) utilities
3. Local components

Remember to put an empty line between the categories.

✅

```ts
import axios from 'axios';

import { alertSuccess } from 'common/atoms/alert';

import constants from './constants';
```

❌

```ts
import { alertSuccess } from 'common/atoms/alert';
import axios from 'axios';
import constants from './constants';
```

## Implicit return

Utilize expressive features like destructuring to reduce boilerplate in code with implicit returns.

✅

```ts
reservations.map(({ beginTime, endTime }) => formatDate(beginTime, endTime));
```

❌

```ts
reservations.map((reservation) => {
  const { beginTime, endTime } = reservation;

  return formatDate(beginTime, endTime);
});
```

## Passing functions

Save a call by passing a function as an argument instead of calling it in new anonymous function.

✅

```ts
const admins = users.filter(isAdmin);
```

❌

```ts
const admins = users.filter((user) => isAdmin(user));
```

## Single `const` / `let` declaration

Avoid multiple declarations in a single `const` / `let` expression. When skimming the source code, it's easy to miss the second assignment.

✅

```ts
const constants = {
  CLOSE: 'Close',
  DELETE: 'Delete',
  CANCEL: 'Cancel',
};
const options = Object.entries(constants);
```

❌

```ts
const constants = {
    CLOSE: 'Close',
    DELETE: 'Delete',
    CANCEL: 'Cancel',
  },
  options = Object.entries(constants);
```

# React

## Props Ordering

Props passed to components should be ordered as:

1. Constant Props
2. Variable Props
3. Event Handlers

✅

```tsx
<Button block type="submit" loading={isLoading} onClick={onSubmit}>
  Save
</Button>
```

❌

```tsx
<Button loading={isLoading} block onClick={onSubmit} type="submit">
  Save
</Button>
```

The first props are close to the component name, which allows us to get a picture of how the component looks like or what's its role. If we have multiple instances of such components, it's easy to spot a pattern and then 'curry' the component - take away the degree of freedom and fix the props under new name `SubmitButton`.

```tsx
const SubmitButton = (props) => <Button {...props} block type="submit" />;
```

## Avoid costly renders

Render is the most-called method of a component. We should avoid building arrays, objects or other structures there.
Instead move them to instance memebers (in a class component) or to module scope.

Example: `Ant` table columns

✅

```tsx
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
];

const UserTable = ({ dataSource }) => <Table dataSource={dataSource} columns={columns} />;
```

❌

```tsx
const UserTable = ({ dataSource }) => (
  <Table
    dataSource={dataSource}
    columns={[
      {
        title: 'Name',
        dataIndex: 'user',
      },
      {
        title: 'Age',
        dataIndex: 'age',
      },
    ]}
  />
);
```

## Event handler naming

The names of handlers should always start with an `on` and end with an event type e.g. `Change`.
For each `onEvent` we should also have a `handleEvent` method on the class.

✅

```tsx
<Select onChange={this.handleChange}>
  <Option>Foo</Option>
  <Option>Bar</Option>
</Select>
```

❌

```tsx
<Select onChange={this.selectValue}>
  <Option>Foo</Option>
  <Option>Bar</Option>
</Select>
```

When having multiple specific events, indicate their specificity at the begining of the event name, not at the end.

✅

```diff
<Profile user={user} onAvatarClick={this.handleAvatarClick} onBioClick={this.handleBioClick} />
```

❌

```ts
<Profile user={user} onClickAvatar={this.handleClickAvatar} onClickBio={this.handleClickBio} />
```

If we follow this rule, event handlers are easily consumed by the `Profile` component
because of their `on${componentName}${eventName}` names.

```tsx
<div className="profile">
  <Avatar onClick={this.props.onAvatarClick} />
  <Bio onClick={this.props.onBioClick />
</div>
```

## Passing event handler properly

Event handler must be passed as a function instead of being called inline. This is a common bug.

✅

```tsx
<Button onClick={submit} />
```

❌

```tsx
<Button onClick={submit()} />
```
