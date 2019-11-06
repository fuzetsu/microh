const { isArray } = Array

const microh = (h, classKey = 'className') => {
  const vnode = h('a', { z: 1 })
  const [tagKey, attrKey] = Object.keys(vnode).filter(k => {
    const val = vnode[k]
    return val && (val === 'a' || val.z)
  })

  const parseTag = (tag, attrs) => {
    if (typeof tag != 'string') return tag
    const idx = tag.indexOf('.')
    if (idx >= 0) {
      const className = tag.slice(idx + 1).replace(/\./g, ' ')
      attrs[classKey] = attrs[classKey] ? className + ' ' + String(attrs[classKey]) : className
      tag = tag.slice(0, idx)
    }
    return tag || 'div'
  }

  return (tag, ...children) => {
    let attrs = children[0]
    if (attrs && typeof attrs == 'object' && !isArray(attrs) && (!attrs[tagKey] || !attrs[attrKey]))
      children.shift()
    else attrs = {}
    return h(parseTag(tag, attrs), attrs, ...children)
  }
}

export default microh
