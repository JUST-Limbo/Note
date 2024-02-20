# Vue SSR

https://www.yuque.com/guoba7/xh8mvb/dfrqiq

[vue服务器端渲染 - Wayne-Zhu - 博客园 (cnblogs.com)](https://www.cnblogs.com/zhuzhenwei918/p/9266407.html)

[实例PK ( Vue服务端渲染 VS 浏览器端渲染 ) - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/25936718)

[vue2.x SSR 服务端渲染从零剖析构建，优缺点解读 - 会写代码的赖先生 - 博客园 (cnblogs.com)](https://www.cnblogs.com/ljx20180807/p/14041490.html)

[vue-cli3 SSR 服务端渲染从零剖析构建 - 会写代码的赖先生 - 博客园 (cnblogs.com)](https://www.cnblogs.com/ljx20180807/p/14047857.html)

[Vue-cli3 SSR程序实现热更新功能 (yuque.com)](https://www.yuque.com/guoba7/xckx8s/htyg45)

[Vue SSR Vuex 数据预取和状态 (yuque.com)](https://www.yuque.com/guoba7/xckx8s/wrw4ww)

[Vue SSR 优化 (yuque.com)](https://www.yuque.com/guoba7/xckx8s/nlmh78)

[laijinxian/vue2.x-ssr-template: 基于vue2.x 的 vue-cli2.x 以及 vue-cli3.x 版本 ssr 服务端渲染 (github.com)](https://github.com/laijinxian/vue2.x-ssr-template)

[lentoo/vue-cli-ssr-example: 基于 vue-cli3构建的一个SSR应用程序 (github.com)](https://github.com/lentoo/vue-cli-ssr-example)

[通过vue-cli3构建一个SSR应用程序 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903678646681607)

[基于vue-cli3 SSR 程序实现热更新功能 - 掘金 (juejin.cn)](https://juejin.cn/post/6844903693373046792)

[5.4.3 SSR的作用及Vue-SSR在网易的实践 (yuque.com)](https://www.yuque.com/guoba7/xh8mvb/dfrqiq#N5D7R)

[聊一聊 Vue-SSR 激活失败（Vue hydration fails）-51CTO.COM](https://www.51cto.com/article/701710.html)

[What to do when Vue hydration fails | blog.Lichter.io](https://blog.lichter.io/posts/vue-hydration-error/)

[彻底理解服务端渲染 - SSR原理 · Issue #30 · yacan8/blog (github.com)](https://github.com/yacan8/blog/issues/30)

sw-precache-webpack-plugin

register-service-worker

## preload prefetch dns-prefetch

`preload` 用于提前加载用于当前页面的资源，而 `prefetch` 则是用于加载未来（比如下一个页面）会用到的资源。

**preload会提高资源加载优先级，prefetch会降低资源加载优先级。**

**preload**安排脚本以更高的优先级进行下载和缓存。但它并不加载和执行脚本，需要自己找到合适的地方将其显式嵌入。

当指定列恶rel="preload"时，要使用as指定其资源类型

```html
<link rel="preload" href="style.css" as="style" />
```

![image-20240219171846240](assets/Vue SSR.assets/image-20240219171846240.png)

**prefetch**此属性标识下一个导航可能需要的资源，浏览器会认为这个资源目前不会用到，但可能下个页面会用到，于是**会将对应资源的下载优先级降为最低（Lowest）**。

在其他资源加载好了之后，下载队列空闲了，该资源才被下载缓存起来。

```html
<link rel="prefetch" href="lib/jquery.min.js" as="script">
```

**dns-prefetch**空闲时间预先对指定域名进行DNS解析，在真正请求该域名下资源时，可以省掉 DNS 查询这一步。

```html
<link rel="dns-prefetch" href="https://cdn-s1.somecdnsite.com">
```

应用场景：

- 常用的 cdn 资源所在的域名先连接好
- 视频不播放，在用户点击播放前，先连上对应域名

**preconnect**不仅进行DNS解析，还预先建立TCP连接（在HTTPS下还会进行TLS握手）。当网页需要加载资源时，连接已经建立，可以立即开始传输数据，从而进一步减少了延迟。通常用于那些需要频繁通信的服务器，如WebSocket服务器。

```html
<link rel="preconnect" href="https://cdn-s1.somecdnsite.com">
```

> 通过 preconnect 和别的域建立连接后，应该尽快的使用它，因为浏览器会关闭所有在 10 秒内未使用的连接。不必要的预连接会延迟其他重要资源，因此要限制 preconnect 连接域的数量。

## 坑：

1. 重复请求

2. [vue-router: 在App.vue中获取不到正确的路由？ - 掘金 (juejin.cn)](https://juejin.cn/post/6844904148408745997)

   客户端存在该问题，server端不存在，会有两端一致性问题

