/* global require */
const o = require('ospec')
const mh = require('./dist/microh.es5')
const react = require('react')
const preact = require('preact')
const hyperapp = require('hyperapp')

const fakeH = (tag, attrs, children) => ({ tag, attrs, children })
const h = mh(fakeH)
const reactH = mh(react.createElement)
const preactH = mh(preact.h)
const hyperH = mh(hyperapp.h)

o.spec('microh', () => {
  o('works', () =>
    o(h('a.test', { href: 'test' }, 'test')).deepEquals({
      tag: 'a',
      attrs: { href: 'test', className: 'test' },
      children: ['test']
    })
  )
  o('no attrs', () => o(h('div', 'test')).deepEquals({ tag: 'div', attrs: {}, children: ['test'] }))
  o('no attrs, vnode first child', () =>
    o(h('ul', h('li'))).deepEquals({
      tag: 'ul',
      attrs: {},
      children: [{ tag: 'li', attrs: {}, children: [] }]
    })
  )
  o('no tagname', () => o(h('')).deepEquals({ tag: 'div', attrs: {}, children: [] }))
  o('multiple classes', () =>
    o(h('aside.one.two.three four')).deepEquals({
      tag: 'aside',
      attrs: { className: 'one two three four' },
      children: []
    })
  )
  o('combines className from attrs', () =>
    o(h('.one two', { className: 'three' }, ['child'])).deepEquals({
      tag: 'div',
      attrs: { className: 'one two three' },
      children: [['child']]
    })
  )
  o('preact works', () => {
    const { nodeName, attributes, children } = preactH('div.test', { title: 'test' }, 'test')
    o(nodeName).equals('div')
    o(attributes).deepEquals({ title: 'test', className: 'test' })
    o(children).deepEquals(['test'])
  })
  o('react works', () => {
    const { type, props } = reactH('div.test', { title: 'test' }, 'test')
    o(type).equals('div')
    o(props).deepEquals({ title: 'test', className: 'test', children: ['test'] })
  })
  o('hyperapp works', () => {
    const { nodeName, attributes, children } = hyperH('div.test', { title: 'test' }, 'test')
    o(nodeName).equals('div')
    o(attributes).deepEquals({ title: 'test', className: 'test' })
    o(children).deepEquals(['test'])
  })
  o('can pass components as tag', () => {
    h({})
    h(class Cmp {})
    h(() => {})
  })
})
