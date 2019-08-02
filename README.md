# `microh` [![npm](https://img.shields.io/npm/v/microh.svg)](https://www.npmjs.com/package/microh) [![size](https://img.badgesize.io/https://unpkg.com/microh@latest/dist/microh.min.js.png?label=gzip&color=blue&compression=gzip)](https://unpkg.com/microh@latest/dist/microh.min.js)

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

const vnode = m('ul.example', [
  m('li', 'one'),
  m('li', 'two'),
  m('li', 'three')
])

render(vnode, document.body)
```
[playground](https://flems.io/#0=N4IgZglgNgpgziAXAbVAOwIYFsZJAOgAsAXLKEAGhAGMB7NYmBvEAXwvW10QICsEqdBk2J4IWAA60ATsQAEwOYQpzpTACYxpc1nLDTaWOQHIJajNWLGAOmnFTZcrBGoHCeg0ePPXtQjbRbITh5IwBeJxc3AApCAEpbIPoQuQA3NFpNOQisaOMAVyh8GAAPbAlYYxVkWzknPKgIKpN6GGM4ilr640bm42IAd1p2zrQ63J6mlX7CNTaEtABdBds1NE1paPTMmBV1Wmp8nAZ8ACNMgE84yhA4GFhLCGS8ACZEAAY2DhBMHDx8ahwAQ0eiMZg8NiLVhAA)

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
