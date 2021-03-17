#  Vue面试题

## v-if和v-for为什么不应该一起用

当 `v-if` 与 `v-for` 一起使用时，`v-for` 具有比 `v-if` 更高的优先级，这意味着 `v-if` 将分别重复运行于每个 `v-for` 循环中



## 计算属性computed的特点

+ 默认`computed`也是一个`watcher`是具备缓存的，只有当依赖的属性发生变化时才更新视图层。

+ 不支持异步，当computed内有异步操作时无效，无法监听数据的变化。

+ 计算属性默认只有 `getter`，不过在需要时你也可以提供一个`setter`：

```js
// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
```

现在再运行 `vm.fullName = 'John Doe'` 时，setter 会被调用，`vm.firstName` 和 `vm.lastName` 也会相应地被更新。



## 侦听属性watch的特点

+ 不支持缓存，数据变，直接会触发相应的操作

+ watch支持异步

+ 监听的函数接收两个参数，第一个参数是最新的值，第二个参数是输入之前的值



## v-if 和 v-show 的区别

v-if ：创建或销毁DOM元素。支持`<template>`语法；

v-show：当v-show赋值为false时，元素被隐藏，此时查看代码时，该元素上会多一个内联样式style=“display:none”。



## 组件中的data为什么是一个函数

一个组件被复用多次的话，也就会创建多个实例。本质上，`这些实例用的都是同一个构造函数`。如果data是对象的话，对象属于引用类型，会影响到所有的实例。所以为了保证组件不同的实例之间data不冲突，data必须是一个函数。



## vue组件通讯

+ vuex
+ provide/inject
+ vue-router
+ props/$emit
+ 事件总线
+ \$ref \$parent ​\$children ​\$root
+ slot
+ v-bind props
+ $attrs $listeners

## provide/inject

Vuex 和 provide/inject 最大的区别在于，Vuex 中的全局状态的每次修改是可以追踪回溯的，而 provide/inject 中变量的修改是无法控制的。

> 提示：`provide` 和 `inject` 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的 property 还是可响应的。（在根组件中将组件本身注入 provide，此时，我们可以在后代组件中任意访问根组件中的所有状态，根组件就成为了全局状态的容器）

```vue
// 根组件提供将自身提供给后代组件
export default {
  provide () {
    return { 
      app: this
    }
  },
  data () {
    return {
      text: 'bar'
    }
  }
}

// 后代组件注入 'app'
<template>
	<div>{{this.app.text}}</div>
</template>
<script>
  export default {
    inject: ['app'],
    created() {
      this.app.text = 'baz' // 在模板中，显示 'baz'
    }
  }
</script>

```



## \$attrs ​\$listeners

`$attrs`表示父组件传给子组件且在子组件中不作为`prop`识别的标签属性（包括静态属性，动态属性，`class`和`style`属性除外）,可以通过`v-bind="$attrs"`传递给更下一级的组件。

`$listeners`包含了父组件给子组件的`v-on`事件监听器（`.native`修饰器修饰的监听器除外）。可以通过`v-on="$listeners"` 传递给更下一级的组件。



## 事件总线	eventBus

定义一个vue对象作为eventBus，让其代为订阅发布事件，进行通讯。

### 1.定义eventBus文件

```js
<script>
export default new Vue({
  name: 'eventBus',
  data() {
    return {
      // code
    }
  }
})
</script>
```

引用eventBus

```js
import eventBus from './js/bus.vue'; 
```

### 2.发布（声明）事件

```vue
created() {  
    eventBus.$on('getTarget', target => {  
        console.log(target);  
    });  
}  
```

### 3.订阅（触发）事件

```vue
methods: {
   addCart(event) {
       eventBus.$emit('getTarget', event.target);   
   }
}
```

### 4.移除事件监听器

```vue
eventBus.$off('getTarget')
```

### 5.销毁一个实例

```vue
eventBus.$destroy()
```





## Vue生命周期

总共分为8个阶段创建前/后，载入前/后，更新前/后，销毁前/后。

> 创建前/后： 在beforeCreate阶段，vue实例的挂载元素el和数据对象data都为undefined，还未初始化。在created阶段，vue实例的数据对象data有了，el为undefined，还未初始化。

> 载入前/后：在beforeMount阶段，vue实例的$el和data都初始化了，但还是挂载之前为虚拟的dom节点，data.message还未替换。在mounted阶段，vue实例挂载完成，data.message成功渲染。

> 更新前/后：当data变化时，会触发beforeUpdate和updated方法

> 销毁前/后：在执行destroy方法后，对data的改变不会再触发周期函数，说明此时vue实例已经解除了事件监听以及和dom的绑定，但是dom结构依然存在，会出发beforeDestory和destoryed方法

> keep-alive专属：activited组件被激活时调用，deadctivated组件被停用时调用



## MVVM

Model-View-ViewModel 模式

- M: model数据模型，通过 Ajax/fetch 等 API 完成客户端和服务端业务 Model 的同步。
- V: view 界面，定义结构、布局，展示 ViewModel 层的数据和状态。
- MV:作为桥梁负责沟通view跟model。当 ViewModel 中数据变化，View 层会得到更新；而当 View 中声明了数据的双向绑定（通常是表单元素），框架也会监听 View 层（表单）值的变化。



## 双向绑定实现原理

`vue`实现数据双向绑定的原理就是用`Object.defineproperty()`重新定义（set方法）对象设置属性值和（get方法）获取属性值的操纵来实现的

Proxy代理整个对象，`Object.defineProperty`只代理对象上的某个属性。

Proxy不兼容IE，`Object.defineProperty`不兼容IE8及以下。

对象上定义新属性时，Proxy可以监听到，`Object.defineProperty`监听不到。

数组新增删除修改时，Proxy可以监听到，`Object.defineProperty`监听不到。

```js
var obj = {
  test:'hello'
}

Object.defineProperty(obj,'test',{
  get() {
    console.log('查看了a属性');
  },
  set(val) {
    console.log('设置了a属性', val);
  }
})
```



## `.sync`修饰符

在有些情况下，我们可能需要对一个 prop 进行“双向绑定”。不幸的是，真正的双向绑定会带来维护上的问题，因为子组件可以变更父组件，且在父组件和子组件都没有明显的变更来源。

这也是为什么我们推荐以 `update:myPropName` 的模式触发事件取而代之。举个例子，在一个包含 `title` prop 的假设的组件中，我们可以用以下方法表达对其赋新值的意图：

```js
this.$emit('update:title', newTitle)
```

然后父组件可以监听那个事件并根据需要更新一个本地的数据 property。例如：

```vue
<text-document
  v-bind:title="doc.title"
  v-on:update:title="doc.title = $event"
></text-document>
```

为了方便起见，我们为这种模式提供一个缩写，即 `.sync` 修饰符：

```vue
<text-document v-bind:title.sync="doc.title"></text-document>
```

注意带有 `.sync` 修饰符的 `v-bind` **不能**和表达式一起使用 (例如 `v-bind:title.sync=”doc.title + ‘!’”` 是无效的)。取而代之的是，你只能提供你想要绑定的 property 名，类似 `v-model`。

当我们用一个对象同时设置多个 prop 的时候，也可以将这个 `.sync` 修饰符和 `v-bind` 配合使用：

```vue
<text-document v-bind.sync="doc"></text-document>
```

这样会把 `doc` 对象中的每一个 property (如 `title`) 都作为一个独立的 prop 传进去，然后各自添加用于更新的 `v-on` 监听器。

将 `v-bind.sync` 用在一个字面量的对象上，例如 `v-bind.sync=”{ title: doc.title }”`，是无法正常工作的，因为在解析一个像这样的复杂表达式的时候，有很多边缘情况需要考虑。



## $nextTick

`vue`实现响应式并不是数据发生变化后`dom`立即变化，而是按照一定的策略来进行`dom`更新。

> nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用nextTick，则可以在回调中获取更新后的 DOM



## v-on可以监听多个方法吗？

```html
<input type="text" v-on="{ input:onInput,focus:onFocus,blur:onBlur, }">
```



## Vue 中的 key 有什么作用？

key 是为 Vue 中 vnode 的唯一标记，通过这个 key， diff 操作可以更准确、更快速



## 长列表性能优化

Vue 会通过 `Object.defineProperty` 对数据进行劫持，来实现视图响应数据的变化，然而有些时候我们的组件就是纯粹的数据展示，不会有任何改变，我们就不需要 Vue 来劫持我们的数据，在大量数据展示的情况下，这能够很明显的减少组件初始化的时间，那如何禁止 Vue 劫持我们的数据呢？可以通过 `Object.freeze` 方法来冻结一个对象，一旦被冻结的对象就再也不能被修改了。

```JS
export default {
  data: () => ({
    users: {}
  }),
  async created() {
    const users = await axios.get("/api/users");
    this.users = Object.freeze(users);
  }
};
```



## 事件的销毁

Vue 组件销毁时，会自动清理它与其它实例的连接，解绑它的全部指令及事件监听器，但是仅限于组件本身的事件。 如果在 js 内使用` addEventListene `等方式是不会自动销毁的，我们需要在组件销毁时手动移除这些事件的监听，以免造成内存泄露，如：

```js
created() {
  addEventListener('click', this.click, false)
},
beforeDestroy() {
  removeEventListener('click', this.click, false)
}
```



## vue 父子组件的生命周期顺序

**一、加载渲染过程**

```repl
父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted
```

**二、子组件更新过程**

```repl
父beforeUpdate->子beforeUpdate->子updated->父updated
```

**三、父组件更新过程**

```repl
父beforeUpdate->父updated
```

**四、销毁过程**

```repl
父beforeDestroy->子beforeDestroy->子destroyed->父destroyed
```



## Vuex和单纯的全局对象有什么区别？

`vuex`和全局对象主要有两大区别：

- `vuex`的状态存储是响应式的。当`vue`组件从`store`中读取状态时，若`store`中的状态发生变化，那么相应的组件也会得到高效更新
- 不能直接改变`store`中的状态，改变`store`中的状态唯一方法是显示地提交`mutation`（`commit`）。这样使得我们可以方便地跟踪每一个状态的变化



## $set $delete

Vue **不能检测**数组和对象的变化。因此若对象/数组是响应式的，且需要在新增/删除property时触发更新视图，则需要使用到`$set $delete`

> vm.$set( target, propertyName/index, value ) // 这是全局Vue.set的别名
>
> vm.$delete( target, propertyName/index ) // 这是全局Vue.delete的别名



## hook

### 在同一组件下监听生命周期

在`created`生命周期中监听其他生命周期，并触发回调

```js
created(){
  this.$on('hook:beforeDestroy',function(){
    console.log('beforeDestroy')
  })
}
```

可以在任意地方使用`this.$on("hook:生命周期",callback)`监听指定生命周期



### 父组件监听子组件的生命周期

1. 使用`on`和`emit`

   子组件emit触发一个事件，父组件emit触发一个事件，父组件on监听相应事件。

   ```vue
   // Parent.vue
   <Child @mounted="doSomething"/>
       
   // Child.vue
   mounted() {
     this.$emit("mounted");
   }
   ```

2. hook

   ```vue
   //  Parent.vue
   <Child @hook:mounted="doSomething" ></Child>
   
   doSomething() {
      console.log('父组件监听到 mounted 钩子函数 ...');
   },
       
   //  Child.vue
   mounted(){
      console.log('子组件触发 mounted 钩子函数 ...');
   },    
       
   // 以上输出顺序为：
   // 子组件触发 mounted 钩子函数 ...
   // 父组件监听到 mounted 钩子函数 ...
   ```

   

## 全局指令和局部指令

全局指令：在main.js中

```js
Vue.directive('upper-word',(el,binding)=>{
  el.textContent = binding.value.toUpperCase();
})
```

局部指令：在组件中添加钩子

```js
// 自定义局部指令
, directives: {
  'lower-word'(el, binding){
    console.log(el, binding)
    el.textContent = binding.value.toLowerCase();
  }
}
```
















