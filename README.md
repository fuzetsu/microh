# `microh` [![npm](https://img.shields.io/npm/v/microh.svg)](https://www.npmjs.com/package/microh) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/microh)](https://unpkg.com/microh@latest/dist/microh.min.js)

A small and simple hyperscript wrapper for vdom libraries such as (but not limited to) Preact, React, and Hyperapp.

## Features

- optional attrs `h('h1', 'Hello World')`
- inline classNames `h('button.button.is-primary')`
- no tag name means div `h('.login-area')`
- varargs `h('div', 'Hello', 'World', 'the time is', Date.now())`

```js
import { h, render } from 'preact'
import microh from 'microh'

// create a wrapped instance of h by passing it to microh
const m = microh(h)

const vnode = m(
  'ul.list',
  m('li.list-item', 'one'),
  m('li.list-item', 'two'),
  m('li.list-item', 'three')
)

render(vnode, document.body)
```

[playground](https://flems.io/#0=N4IgZglgNgpgziAXAbVAOwIYFsZJAOgAsAXLKEAGhAGMB7NYmBvEAXwvW10QICsEqdBk2J4IWAA60ATsQAEwOYQpzpTACYxpc1nLDTaWOQHIJajNWLGAOmnFTZcrBGoHCeg0ePPXtQjbRbAHoguVcYDEY5DDkAd2kMCQkYdTkINDhiDDRqGDlaMCU5ACMATzkJDDg4dIBzNPliWicXN1shTKc5AF4W30IACkIASlt2+k6ANzRaTR6nAeMAVyh8KAhMgFpM0thjFVs5BeN1-ZN6GGNhikPj05VjYljaK5u0I6xF+5NiQjVL663T4nCBnYxgWhLaRXWyjQJoNRoTTSAbTWYwFTqWjUJY4Bj4YqzUrDSggOAwWCWCATPAARgAzIgAEwADjYHBAmBweHw1GqpKEjGYPDYAF1WEA)

## Installation

### esm modules

```js
import microh from 'https://unpkg.com/microh?module'
```

### Browser

```html
<script src="https://unpkg.com/microh"></script>
<script>
  window.microh
</script>
```

### NodeJS

```js
// npm install microh
const microh = require('microh')
```

## Usage

**[React](https://github.com/facebook/react)**

```js
import React from 'react'
import microh from 'microh'

const m = microh(React.createElement)
```

**[Preact](https://github.com/preactjs/preact)**

```js
import { h } from 'preact'
import microh from 'microh'

const m = microh(h)
```

**[Hyperapp](https://github.com/JorgeBucaran/hyperapp)**

For hyperapp 2.0.4 and earlier microh will work out of the box:

```js
import { h } from 'hyperapp'
import microh from 'microh'

const m = microh(h)
```

For later versions you will have to use this snippet because of changes to how vNodes are structured and how text children are handled:

```js
import { h, text } from 'hyperapp'
import microh from 'microh'

const m = microh((tag, props, ...children) =>
  typeof tag === 'function'
    ? tag(props, children)
    : h(
        tag,
        props,
        []
          .concat(...children)
          .map(child =>
            typeof child === 'string' || typeof child === 'number' ? text(child) : child
          )
      )
)
```

**Other Libraries**

If you're using another vdom library and directly passing the equivalent of the `h()` function to microh doesn't work you can always pass a function that calls the `h()` with any necessary adjustments made.

For example, say a particular vdom library always expects children to be passed as an array, you could handle it like this:

```js
import { makeElem } from 'some-vdom'
import microh from 'microh'

const m = microh((tag, props, ...children) => makeElem(tag, props, children))
```
