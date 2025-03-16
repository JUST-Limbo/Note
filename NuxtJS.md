# NuxtJS

## 安装初始化

### raw.githubusercontent.com镜像错误

[网站IP查询_IP反查域名_同IP网站查询 - 站长工具](https://tool.chinaz.com/same/raw.githubusercontent.com)

查询对应域名的IP，调整hosts文件，目录`c:\windows\system32\drivers\etc`
```bash
185.199.111.133 raw.githubusercontent.com
185.199.109.133 raw.githubusercontent.com
185.199.110.133 raw.githubusercontent.com
185.199.108.133 raw.githubusercontent.com
```

### SAOError: Failed to install packages in XXX

忽略报错，直接进行初始化

```bash
npm i
npm run dev
```

###  The requested module 'node:events' does not provide an export named 'addAbortListener'

通常是node版本问题

```bash
nvm use 20.17.0
#或
npm init nuxt-app@2 nuxtdemo
```



参考资料：

[Nuxt无法初始化项目（极速版） - 知乎](https://zhuanlan.zhihu.com/p/695734748)

[Nuxt2 创建项目中的问题_saoerror: failed to install packages in-CSDN博客](https://blog.csdn.net/gjzzhjuer51129/article/details/136701522)

## SSR脱水 喝水的概念

[React SSR中的hydrate是什么意思？ | 黯羽轻扬 (ayqy.net)](http://www.ayqy.net/blog/ssr-hydrate/)

[如何理解 SSR 中的 hydrate？ - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/323174003)

![image-20230220234231709](assets//NuxtJS.assets/image-20230220234231709.png)

## cookie-universal-nuxt

## 子组件meta标签覆盖父组件

H5应用的meta标签可以在`nuxt.config.js`中通过`head`字段进行配置，也可以在子组件中的`head`字段进行配置。

`nuxt.config.js`

```js
head: {
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
  ]
}
```

`page1.vue`

```js
export default {
  head () {
    return {
      title: `Page 1 (${this.name}-side)`,
      meta: [
        { hid: 'description', name: 'description', content: 'Page 1 description' }
      ]
    }
  }
}
```

为了避免子组件中的 meta 标签不能正确覆盖父组件中相同的标签而产生重复的现象，建议利用 `hid` 键为 meta 标签配一个唯一的标识编号。
