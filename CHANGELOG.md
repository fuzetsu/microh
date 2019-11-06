# Changelog

## 0.1.0

_2019-11-06_

After this update microh will spread children into the provided `h` function, instead of just passing the children array.

```js
// this
const h = (tag, props, ...children) => null
// instead of the old way
const h = (tag, props, children) => null
```

This was done because React expects all vnodes within a nested array to be keyed.

**Other changes:**

- hyperapp tests were updated from `v1` to `v2`
- preact tests were updated from `v8` to `v10`
- expanded tests to cover a few more cases for react/preact/hyperapp

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
