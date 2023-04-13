# Vue笔记

## 在当前目录下直接创建vue项目而不是创建子目录

```bash
vue create .
```

## watch注意事项

注意：在变更 (不是替换) 对象或数组时，旧值将与新值相同，因为它们的引用指向同一个对象/数组。Vue 不会保留变更之前值的副本。

## props

```js
props:{
	arr:{
		type: Array,
      	default: function() {
        	return []
      	}
	}
}
```

default属性值为该 prop 指定一个默认值。如果该 prop 没有被传入，则换做用这个值。**对象或数组的默认值必须从一个工厂函数返回。**

## 如何判断是否显式传入了prop

```js
this.$options.propsData.hasOwnProperty('xxx')
```

参考资料：

https://www.bilibili.com/video/BV12G4y1L7ts?share_source=copy_web

## 命名视图

有时候想同时 (同级) 展示多个视图，而不是嵌套展示，例如创建一个布局，有 `sidebar` (侧导航) 和 `main` (主内容) 两个视图，这个时候命名视图就派上用场了。你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 `router-view` 没有设置名字，那么默认为 `default`。

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 `components` 配置 (带上 s)：

```js
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```

### 应用场景

PC、移动端路由组件切换

```html
<router-view v-if="pageType == 'pc'" name="pc"></router-view>
<router-view v-else-if="pageType == 'mobile'" name="m"></router-view>
```

## Vue中图片src使用变量

[vue中动态引入图片为什么要是require， 你不知道的那些事 - 掘金 (juejin.cn)](https://juejin.cn/post/7159921545144434718)

错误的写法：因为在打包时会被自动加上hash值从而引用失败（或因为没有把路径字符串当做路径处理，而是纯字符串处理？）

```vue
<template>
  <img :src="imgSrc" />
</template>

<script>
export default {
  data() {
    return {
      imgSrc: '../../images/web_bg.png'
    }
  }
}
</script>
```

解决方法：

1. 使用网络资源

2. 使用import或require导入本地资源

   ```js
   import imgSrc from '../../images/web_bg.png'
   export default {
     data() {
       return {
           imgSrc: imgSrc,
   		imgSrc2: require('../../images/web_bg.png')
       }
     }
   }
   ```


## vue重置数据

```js
Object.assign(this.$data, this.$options.data.call(this))
```

[Vue中的this.$options.data()和this.$data_mocoe的博客-CSDN博客_this.$data](https://blog.csdn.net/mocoe/article/details/89682022)

## 全局scss

共享全局scss变量（via [CSS 相关 | Vue CLI (vuejs.org)](https://cli.vuejs.org/zh/guide/css.html#向预处理器-loader-传递选项)）

```js
// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.sass` 这个文件
        // 注意：在 sass-loader v8 中，这个选项名是 "prependData"
        additionalData: `@import "~@/variables.sass"`
      },
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `prependData` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      scss: {
        additionalData: `@import "~@/variables.scss";`
      },
      // 给 less-loader 传递 Less.js 相关选项
      less:{
        // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
        // `primary` is global variables fields name
        globalVars: {
          primary: '#fff'
        }
      }
    }
  }
}
```

参考资料

+ [vue-cli3/cli4 vue.config.js 中全局引入 scss 样式不生效 解决方案 - 简书 (jianshu.com)](https://www.jianshu.com/p/72bbeb6279eb)

+ [vue全局引入scss样式文件_KILIG_yss的博客-CSDN博客_vue 引入scss](https://blog.csdn.net/Yss915/article/details/126573672)

## 路由懒加载与webpack-dev-server性能

原因未知，效果未验证。

```js
// _import_development.js
module.exports = file => require('@/views/' + file + '.vue').default
```

```js
// _import_production.js
module.exports = file => () => import('@/views/' + file + '.vue')
```

```javascript
const _import = require('./_import_' + process.env.NODE_ENV);

export const routers = [
    {
        path: '/',
        name: 'home',
        meta: { 
            title: '主页'
        },
        component: _import('home')
    },
]
```

参考资料

+ [vue路由懒加载链接过多导致本地开发热更新慢的解决 - 简书 (jianshu.com)](https://www.jianshu.com/p/ff1f10909a67)
