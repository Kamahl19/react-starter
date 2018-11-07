# Coding styleguide

Here we list number coding guidelines which you should keep.
Easily refer to them in coding review.
We believe that using these conventions keep your project healthy & maintanable by having a readable codebase.

This is a live document, updatated on the fly.

# React

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
