用户首次访问 service worker 控制的网站或页面时，service worker 会立刻被下载。

之后，在以下情况将会触发更新：

- 一个前往作用域内页面的导航
- 在 service worker 上的一个事件被触发并且过去 24 小时没有被下载