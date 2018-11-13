# Coding styleguide

Here we list number coding guidelines which you should keep.
Easily refer to them in coding review.
We believe that using these conventions keep your project healthy & maintanable by having a readable codebase.

This is a live document, updatated on the fly.

# JavaScript

## Good practice

### Passing functions

Save a call by passing a function as argument, instead of calling it in new anonymous function.

❌

```js
const isAdmin = user => user.role === 'admin';
const admins = users.filter(user => isAdmin(user));
```

✅

```diff
- const admins = users.filter(user => isAdmin(user));
+ const admins = users.filter(isAdmin);
```

Exceptions:

- mind arity

### Const without comma operator

❌

```js
const response = {
    Close: 'Close',
    Delete: 'Delete',
    Cancel: 'Cancel',
  },
  options = Object.entries(response);
```

Avoid multiple declarations in a single `const` expression. When skimming the source code, it's easy to miss the `options` assignment.

✅

```diff
const response = {
    Close: 'Close',
    Delete: 'Delete',
    Cancel: 'Cancel',
-   },
-  options = Object.entries(response);
+  };
+  const options = Object.entries(response);
```

Now it's clear, that there are two separate entities instead of one.

# React

## Patterns

### PropTypes

#### Should be a static property on a class component

In a class component, define the propTypes as a static property on the class.
This way it's close to the name of the class, which is analogous to arguments of a function.

```jsx
class Status extends Component {
  static propTypes = {
    isOnline: PropTypes.bool.isRequired,
  };

  // ...
}

function Status({ isOnline }) {
  //....
}
```

### Event handler naming

The names of handlers should always start with `on` and end with event type e.g. `Change`.
For each `onEvent` we should have `handleEvent` method on the class.

❌

```jsx
<Select onChange={this.selectvalue}>
  <Option>Foo</Option>
  <Option>Bar</Option>
</Select>
```

✅

```diff
- <Select onChange={this.selectvalue}>
+ <Select onChange={this.handleChange}>
```

When having multiple specific events, indicate the specificity at the begining of the event name, not at the end.

❌

```js
<Profile user={user} onClickAvatar={this.handleClickAvatar} onClickBio={this.handleClickBio} />
```

✅

```diff
<Profile
  user={user}
- onClickAvatar={this.handleClickAvatar}
+ onAvatarClick={this.handleAvatarClick}
- onClickBio={this.handleClickBio}
+ onBioClick={this.handleBioClick}
/>
```

In the profile, then those events are easily consumed - concrete components should accepts props named like
`on + componentName + eventName`.

```js
<div className="profile">
  <Avatar onClick={this.props.onAvatarClick} />
  <Bio onClick={this.props.onBioClick />
</div>
```

## Common Bugs

### Calling handler in `onClick`

❌

```jsx
<Button onClick={isAdmin ? approveUsers() : () => approveUser(user.id)} />
```

The `approveUsers` function will be called on the render which is a bug. Instead, you should pass a reference in.

✅

```diff
- <Button onClick={isAdmin ? approveUsers() : () => approveUser(user.id)} />
+ <Button onClick={isAdmin ? approveUsers : () => approveUser(user.id)} />
```
