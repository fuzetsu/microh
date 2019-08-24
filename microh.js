const { isArray } = Array

const parseTag = (tag, attrs) => {
  if (typeof tag != 'string') return tag
  const idx = tag.indexOf('.')
  if (idx >= 0) {
    const className = tag.slice(idx + 1).replace(/\./g, ' ')
    attrs.className = attrs.className ? className + ' ' + attrs.className : className
    tag = tag.slice(0, idx)
  }
  return tag || 'div'
}

const microh = h => {
  const vnode = h('a')
  const [tagKey] = Object.keys(vnode).filter(k => vnode[k] === 'a')
  return (tag, ...children) => {
    let attrs = children[0]
    if (attrs && typeof attrs == 'object' && !isArray(attrs) && !attrs[tagKey]) children.shift()
    else attrs = {}
    return h(parseTag(tag, attrs), attrs, children)
  }
}

export default microh
