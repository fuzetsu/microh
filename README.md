# `microh` [![npm](https://img.shields.io/npm/v/microh.svg)](https://www.npmjs.com/package/microh) [![size](https://img.badgesize.io/https://unpkg.com/microh@latest/dist/microh.min.js.png?label=gzip&color=blue&compression=gzip)](https://unpkg.com/microh@latest/dist/microh.min.js)

A small and simple hyperscript helper utility.

Allows you to create vdom views conveniently:

- optional attrs `h('h1', 'Hello World')`
- inline classNames `h('button.button.is-primary')`
- no tag name means div `h('.login-area')`

```js
import { h as hyper, render } from 'preact'
import bh from 'microh'

const h = bh(h)

const vnode = h('ul.example', [
  h('li', 'one'),
  h('li', 'two'),
  h('li', 'three')
])

render(vnode, document.body)
```

## Installation

### esm modules

```js
import bh from 'https://unpkg.com/microh?module'
```

### Browser

```html
<script src="https://unpkg.com/microh"></script>
<script>
  const bh = window.microH
</script>
```

### NodeJS

```js
// npm install microh
const bh = require('microh')
```
