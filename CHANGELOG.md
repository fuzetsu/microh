# Changelog

## 0.0.4

_2019-09-05_

Reverted simplified vnode detection. Turns out it wasn't the best idea.

Since react uses `type`, a fairly common key `m('input', { type: 'number' })` was being interpreted as an `<input>` element with a `<number>` vnode inside of it.

Added parameter to configure what key microh will look for the `className` in, default is `className`.

This was done since some libraries accept `class`, allowing the developer to use what they prefer.

```js
const m = microh(preact.h, 'class')
```

## 0.0.3

_2019-08-23_

Simplified vnode detection. Was previously detecting the property key for `tag` and `attrs`, and checking for the presence of both on each call.

Now only detecting and checking `tag`. This aligns with how vdom libraries detect vnodes internally.
