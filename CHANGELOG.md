# Changelog

## 0.0.3

_2019-08-23_

Simplified vnode detection. Was previously detecting the property key for `tag` and `attrs`, and checking for the presence of both on each call.

Now only detection and checking `tag`. This aligns with how vdom libraries detect vnodes internally.
