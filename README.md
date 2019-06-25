# `microh` [![npm](https://img.shields.io/npm/v/microh.svg)](https://www.npmjs.com/package/microh) [![size](https://img.badgesize.io/https://unpkg.com/microh@latest/dist/microh.min.js.png?label=gzip&color=blue&compression=gzip)](https://unpkg.com/microh@latest/dist/microh.min.js)

A small and simple hyperscript wrapper for vdom libraries such as (but not limited to) Preact, React, and Hyperapp.

## Features

- optional attrs `h('h1', 'Hello World')`
- inline classNames `h('button.button.is-primary')`
- no tag name means div `h('.login-area')`
- varargs `h('div', 'Hello', 'World', 'the time is', Date.now())`

```js
import { h as hyper, render } from 'preact'
import mh from 'microh'

// create a wrapped instance of h by passing it to microh
const h = mh(hyper)

const vnode = h('ul.example', [
  h('li', 'one'),
  h('li', 'two'),
  h('li', 'three')
])

render(vnode, document.body)
```
[playground](https://flems.io/#0=N4IgZglgNgpgziAXAbVAOwIYFsZJAOgAsAXLKEAGhAGMB7NYmBvEAXwvW10QICsEqdBk2J4IWAA60ATsQAEwOYTkY4SgJ4SY0inOlMAJtrms5YabSxyA5BP0ZqxawB004qbLkAjZecs2sCGoLQhc0VyE4eWUAXm9CAApCTW0ASlcI+ii5ADc0WiM5OMTrAFcofBgAD2wJWGtdZFc5JQTrKAgGm3oYa1SKZtb2zt1rYgB3Wj6BtBaSjq6xwn1e9LQAXTXXfTQjaQS8gphdA1pqUpwGfC8C9VTKEDgYWEcILLwARg-EACYADjYHBAmBweHw1DgAho9EYzB4bHWrCAA)

## Installation

### esm modules

```js
import mh from 'https://unpkg.com/microh?module'
```

### Browser

```html
<script src="https://unpkg.com/microh"></script>
<script>
  const mh = window.microh
</script>
```

### NodeJS

```js
// npm install microh
const mh = require('microh')
```
