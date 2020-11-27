const requireEsm = require('esm')(module)
const o = require('ospec')
const mh = require('./dist/microh.es5.min')
const react = require('react')
const preact = require('preact')
const hyperapp = requireEsm('hyperapp')

const fakeH = (tag, attrs, ...children) => ({ tag, attrs, children })
const h = mh(fakeH)
const reactH = mh(react.createElement)
const preactH = mh(preact.h, 'class')
const hyperH = mh((tag, props, ...children) =>
  typeof tag === 'function'
    ? tag(props, children)
    : hyperapp.h(
        tag,
        props,
        []
          .concat(...children)
          .map(child =>
            typeof child === 'string' || typeof child === 'number' ? hyperapp.text(child) : child
          )
      )
)

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
  o('preact works - attrs + single child', () => {
    const { type, props } = preactH('div.test', { title: 'test' }, 'test')
    o(type).equals('div')
    // preact/react single child not wrapped in array
    o(props).deepEquals({ title: 'test', class: 'test', children: 'test' })
  })
  o('preact works - attrs + multi child', () => {
    const { type, props } = preactH('div.test', { title: 'test' }, 'test', ' ', 'test2')
    o(type).equals('div')
    o(props).deepEquals({ title: 'test', class: 'test', children: ['test', ' ', 'test2'] })
  })
  o('preact works - no attrs + child', () => {
    const { type, props } = preactH('div.test', 'test')
    o(type).equals('div')
    o(props).deepEquals({ class: 'test', children: 'test' })
  })
  o('react works - attrs + single child', () => {
    const { type, props } = reactH('div.test', { title: 'test' }, 'test')
    o(type).equals('div')
    o(props).deepEquals({ title: 'test', className: 'test', children: 'test' })
  })
  o('react works - attrs + multi child', () => {
    const { type, props } = reactH('div.test', { title: 'test' }, 'test', ' ', 'test2')
    o(type).equals('div')
    o(props).deepEquals({ title: 'test', className: 'test', children: ['test', ' ', 'test2'] })
  })
  o('react works - no attrs + child', () => {
    const { type, props } = reactH('div.test', 'test')
    o(type).equals('div')
    o(props).deepEquals({ className: 'test', children: 'test' })
  })
  o('hyperapp works - attrs + single child', () => {
    const { type, props, children } = hyperH('div.test', { title: 'test' }, 'test')
    o(type).equals('div')
    o(props).deepEquals({ title: 'test', className: 'test' })
    o(children[0].type).equals('test')
  })
  o('hyperapp works - attrs + multi child', () => {
    const {
      type,
      props,
      children: [one, two, three] // hyperapp converts text into vnodes with type == 3
    } = hyperH('div.test', { title: 'test' }, 'test', ' ', 'test2')
    o(type).equals('div')
    o(props).deepEquals({ title: 'test', className: 'test' })
    o([one.type, two.type, three.type]).deepEquals(['test', ' ', 'test2'])
  })
  o('hyperapp works - no attrs + child', () => {
    const { type, props, children } = hyperH('div.test', 'test')
    o(type).equals('div')
    o(props).deepEquals({ className: 'test' })
    o(children[0].type).equals('test')
  })
  o('can pass components as tag', () => {
    o(typeof h({}).tag).equals('object')
    o(typeof h(class Cmp {}).tag).equals('function')
    o(typeof h(() => {}).tag).equals('function')
  })
  o('can use either tag or attr key in props but not both', () => {
    o(reactH('input', { type: 'number' }).props).deepEquals({ type: 'number' })
    o(preactH('input', { nodeName: 'div' }).props).deepEquals({ nodeName: 'div' })
    o(hyperH('input', { attributes: 'hello' }).props).deepEquals({ attributes: 'hello' })
    o(reactH('input', { type: 'number', props: 'some' }).props.children).deepEquals({
      type: 'number',
      props: 'some'
    })
  })
})
