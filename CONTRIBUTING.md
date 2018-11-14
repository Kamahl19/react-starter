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

```js
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

#### Should have defaultProps marked as required

```js
class Date extends Component {
  static propTypes = {
    format: PropTypes.oneOf(['hour', 'day', 'week']).isRequired,
  };

  static defaultProps = {
    format: 'day',
  };
}

render(<Date />); // Renders without warning
```

#### Should not use default value syntax in function component

Default value won't be checked as defaultProps and treated as missing value.

❌

```js
const Hello = ({ to = 'world' }) => <h1>Hello {to}!</h1>;

Hello.propTypes = {
  to: PropTypes.string.isRequired,
};

render(<Hello />); // Warning: missing required prop!
```

✅

```diff
- const Hello = ({ to = 'world'  }) => <h1>Hello {to}!</h1>;
+ const Hello = ({ to }) => <h1>Hello {to}!</h1>;

Hello.propTypes = {
  to: PropTypes.string.isRequired,
};

+ Hello.defaultProps = {
+  to: 'world',
+ };
```

### Render

#### Props Ordering

Props passed to components should be ordered as:

1. Constant Props
2. Variable Props
3. Event Handlers

```js
render() {
  const { isLoading, onSubmit } = this.props;

  return (
    <Button block type="submit" loading={isLoading} onClick={onSubmit}>
      Save
    </Button>
  );
}
```

The first props are close to the component name, which allows us to get a picture of how the component looks like or what's its role. If we have multiple instances of such components, it's easy to spot a pattern and then 'curry' the component - take away the degree of freedom and fix the props under new name:

```js
const SubmitButton = props => <Button {...props} block type="submit" />;
```

This SubmitButton represents a subset of all buttons. Ordering props helped us to find it. It would be much harder, if the
props would be ordered ad-hoc.

❌

```js
<Button loading={isLoading} block onClick={onSubmit} type="submit">
  Save
</Button>
```

#### Avoid costly renders

Render is the most-called method of a component. We should avoid building arrays, objects or other structures there.
Instead move them to instance memebers (in a class component) or to module scope.

Example: Ant table columns

❌

```js
const UserTable = ({ dataSource }) => {
  return (
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
};
```

✅

```js
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

const UserTable = ({ dataSource }) => {
  return <Table dataSource={dataSource} columns={columns} />;
};
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
