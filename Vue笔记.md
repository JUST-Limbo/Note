# Vue笔记

## watch注意事项

> 注意：在变更 (不是替换) 对象或数组时，旧值将与新值相同，因为它们的引用指向同一个对象/数组。Vue 不会保留变更之前值的副本。

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

## Vue中图片Src使用变量

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
