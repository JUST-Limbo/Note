# Vue笔记

## props

```
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

