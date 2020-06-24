---
note: 基于vue + vuex + vue-router + axios + less + elementUI
---
# Vue开发中的小技巧及注意事项

## 父子组件的生命周期钩子函数执行先后顺序

组件的生命周期钩子函数是到了某个生命周期节点就会触发，而不是在这个钩子中进行生命周期，比如说DOM加载好了，就会触发`mounted`钩子函数，所以在`created`里面写一个延迟定时器，`mounted`钩子不会等定时器执行。

关于父子组件的生命周期：不同的钩子函数有不同的表现。父组件的虚拟 DOM 先初始化好了（`beforeMount`），才会去初始化子组件的虚拟 DOM （`beforeMount`），而 `mounted` 事件，等价于 `window.onload`，子组件 DOM 没加载好，父组件 DOM 永远不可能加载好。所以基本生命周期钩子函数执行顺序是：父beforeCreate -> 父created -> 父beforeMount -> 子beforeCreate -> 子created -> 子beforeMount -> 子mounted -> 父mounted

父子组件的update和beforeUpdate执行先后顺序：数据修改+虚拟DOM准备好会触发beforeUpdate，换句话说beforeUpdate等价于beforeMount，而update等价于mounted。所以先后顺序是： 父beforeUpdate -> 子beforeUpdate -> 子update -> 父update。

同理`beforeDestory`和`destoryed`的先后顺序是：父beforeDestory -> 子beforeDestory -> 子destoryed -> 父destoryed。

生命周期钩子函数其实也可以写成数组的形式：`mounted: [mounted1, mounted2]`,同一个生命周期可以触发多个函数，这也是`mixin`（混入）的原理，`mixin`里面也可以写生命周期钩子，最终会和组件里面的生命周期钩子函数一起变成数组形式，`mixin`里面的钩子函数会先执行

## 父组件监听子组件的生命周期

可以写自定义事件，然后在子组件的生命周期函数中触发这个自定义事件，但是不优雅，我们可以使用`hook`：

```html
<child @hook:created="childCreated"></child>
```

从A页面切换到B页面，A页面中有一个定时器，到了B页面用不上，需要在离开A页面的时候清除掉，办法很简单，在A页面的生命周期钩子函数`beforeDestory`或者路由钩子函数`beforeRouteLeave`里面清除掉就行，但是问题来了，怎么拿到定时器呢？把定时器写到`data`里面，可行但是不优雅，我们有如下写法：

```javascript
// 在初始化定时器后
this.$once('hook:beforeDestory', ()=>{
  clearInterval(timer);
});
```

## is的作用和用法

众所周知，ul里面嵌套li的写法是html语法的固定写法（还有如table、select等）。

```html
<ul>
  <my-component></my-component>
  <my-component></my-component>
</ul>
```

因此，如上写法，是无效甚至是会报错的。
而使用is就可以解决这种问题。

```html
<ul>
  <li is="my-component"></li>
</ul>
```

当然，首先你需要注册my-component组件。

is还有一种用法，配合`component`一起使用时，实现动态匹配切换组件。

```html
<component :is="组件名变量"></component>
```

## 给elementUI下拉菜单的command事件传额外参数

原生DOM事件绑定的函数的第一个参数都会是事件对象event，但是有时候我们想给这个函数传其他的参数，直接传会覆盖掉event，我们可以这么写`<div @click="clickDiv(params, $event)"></div>`，变量`$event`就代表事件对象。

如果要传的变量不是事件对象呢？在使用elementUI的时候碰到这么一个情况，在表格中使用了下拉菜单组件，代码如下：

```html
<el-table-column label="日期" width="180">
  <template v-slot="{row}">
    <el-dropdown @command="handleCommand">
      <span>
        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template slot="dropdown"> //<template slot="dropdown">
        <el-dropdown-menu>
          <el-dropdown-item command="a">黄金糕</el-dropdown-item>
          <el-dropdown-item command="b">狮子头</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </template>
</el-table-column>
```

下拉菜单事件`command`函数自带一个参数，为下拉选中的值，这个时候我们想把表格数据传过去，如果`@command="handleCommand(row)"`这样写，就会覆盖掉自带的参数，该怎么办呢？这时候我们可以借助箭头函数：`@command="command => handleCommand(row,command)"`，完美解决传参问题。

顺便说一下，elementUI的表格可以用变量`$index`代表当前的列数，和`$event`一样的使用：

```html
<el-table-column label="操作">
  <template v-slot="{ row, $index }">
    <el-button @click="handleEdit($index, row)">编辑</el-button>
  </template>
</el-table-column>
```

当默认参数有多个（或者未知个数）的时候，可以这样写：`@current-change="(...defaultArgs) => treeClick(otherArgs, ...defaultArgs)"`。









































