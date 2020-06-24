---
note: Vue各类特性支持表
---
# Vue特性支持表

[文档](https://uniapp.dcloud.io/use?id=%25e5%2585%25a8%25e5%25b1%2580%25e9%2585%258d%25e7%25bd%25ae)

## 全局配置

| Vue 全局配置 | H5 | App端旧版 | App端V3 | 微信小程序 | 说明 |
| --- | --- | --- | --- | --- | --- |
| Vue.config.silent | 支持 | 支持 | 支持 | 支持 | - |
| Vue.config.optionMergeStrategies | 支持 | 支持 | 支持 | 支持 | - |
| Vue.config.devtools | 支持 | 不支持 | 不支持 | 不支持 | 只在`Web`环境下支持 |
| Vue.config.errorHandler | 支持 | 支持 | 支持 | 支持 | - |
| Vue.config.warnHandler | 支持 | 支持 | 支持 | 支持 | - |
| Vue.config.ignoredElements | 支持 | 支持 | 支持 | 支持 | 强烈不推荐，会覆盖`uni-app`框架配置的内置组件 |
| Vue.config.keyCodes | 支持 | 不支持 | 不支持 | 不支持 | - |
| Vue.config.performance | 支持 | 不支持 | 不支持 | 不支持 | 只在`Web`环境下支持 |
| Vue.config.productionTip | 支持 | 支持 | 支持 | 支持 | - |

## 全局 API

| Vue 全局 API | H5 | App端旧版 | App端V3 | 微信小程序 | 说明 |
| --- | --- | --- | --- | --- | --- |
| Vue.extend | 支持 | 不支持 | 支持 | 不支持 | 不可作为组件使用 |
| Vue.nextTick | 支持 | 不支持 | 不支持 | 不支持 | - |
| Vue.set | 支持 | 支持 | 支持 | 支持 | - |
| Vue.delete | 支持 | 支持 | 支持 | 支持 | - |
| Vue.directive | 支持 | 不支持 | 支持 | 不支持 | - |
| Vue.filter | 支持 | 支持 | 支持 | 支持 | App端旧版不可以在`class`中使用 |
| Vue.component | 支持 | 支持 | 支持 | 支持 | - |
| Vue.use | 支持 | 支持 | 支持 | 支持 | - |
| Vue.mixin | 支持 | 支持 | 支持 | 支持 | - |
| Vue.version | 支持 | 支持 | 支持 | 支持 | - |
| Vue.compile | 支持 | 不支持 | 不支持 | 不支持 | `uni-app`使用的`vue`是只包含运行时的版本 |

## 选项

| Vue 选项 | H5 | App端旧版 | App端V3 | 微信小程序 | 说明 |
| --- | --- | --- | --- | --- | --- |
| data | 支持 | 支持 | 支持 | 支持 | - |
| props | 支持 | 支持 | 支持 | 支持 | App端旧版不可以传递函数 |
| propsData | 支持 | 支持 | 支持 | 支持 | - |
| computed | 支持 | 支持 | 支持 | 支持 | - |
| methods | 支持 | 支持 | 支持 | 支持 | - |
| watch | 支持 | 支持 | 支持 | 支持 | - |
| el | 支持 | 不支持 | 不支持 | 不支持 |  |
| template | 支持 | 不支持 | 不支持 | 不支持 | `uni-app`使用的`vue`是只包含运行时的版本 |
| render | 支持 | 不支持 | 不支持 | 不支持 | - |
| renderError | 支持 | 不支持 | 不支持 | 不支持 | - |
| directives | 支持 | 不支持 | 支持 | 不支持 | - |
| filters | 支持 | 支持 | 支持 | 支持 | App端旧版不可以在`class`中使用 |
| components | 支持 | 支持 | 支持 | 支持 | - |
| parent | 支持 | 支持 | 支持 | 支持 | 不推荐 |
| mixins | 支持 | 支持 | 支持 | 支持 | - |
| extends | 支持 | 支持 | 支持 | 支持 | - |
| provide/inject | 支持 | 支持 | 支持 | 支持 | App端旧版部分支持 |
| name | 支持 | 支持 | 支持 | 支持 | App端旧版不支持递归组件 |
| delimiters | 支持 | 不支持 | 不支持 | 不支持 | - |
| functional | 支持 | 不支持 | 不支持 | 不支持 | - |
| model | 支持 | 不支持 | 支持 | 不支持 | - |
| inheritAttrs | 支持 | 不支持 | 支持 | 不支持 | - |
| comments | 支持 | 不支持 | 不支持 | 不支持 | - |

## 生命周期钩子

| Vue 生命周期钩子 | H5 | App端旧版 | App端V3 | 微信小程序 | 说明 |
| --- | --- | --- | --- | --- | --- |
| beforeCreate | 支持 | 支持 | 支持 | 支持 | - |
| created | 支持 | 支持 | 支持 | 支持 | - |
| beforeMount | 支持 | 支持 | 支持 | 支持 | - |
| mounted | 支持 | 支持 | 支持 | 支持 | - |
| beforeUpdate | 支持 | 支持 | 支持 | 支持 | - |
| updated | 支持 | 支持 | 支持 | 支持 | - |
| activated | 支持 | 不支持 | 支持 | 不支持 | - |
| deactivated | 支持 | 不支持 | 支持 | 不支持 | - |
| beforeDestroy | 支持 | 支持 | 支持 | 支持 | - |
| destroyed | 支持 | 支持 | 支持 | 支持 | - |
| errorCaptured | 支持 | 支持 | 支持 | 支持 | - |

## 实例属性
| Vue 实例属性 | H5 | App端旧版 | App端V3 | 微信小程序 | 说明 |
| --- | --- | --- | --- | --- | --- |
| vm.$data | 支持 | 支持 | 支持 | 支持 | - |
| vm.$props | 支持 | 支持 | 支持 | 支持 | - |
| vm.$el | 支持 | 不支持 | 不支持 | 不支持 | - |
| vm.$options | 支持 | 支持 | 支持 | 支持 | - |
| vm.$parent | 支持 | 支持 | 支持 | 支持 | `uni-app`里面`view`等内置标签是以组件方式实现，`$parent`会获取这些内置组件 |
| vm.$root | 支持 | 支持 | 支持 | 支持 | - |
| vm.$children | 支持 | 支持 | 支持 | 支持 | - |
| vm.$slots | 支持 | 支持 | 不支持 | 支持 | App端旧版获取值为`{'slotName':true/false}`比如：`{"footer":true}` |
| vm.$scopedSlots | 支持 | 支持 | 支持 | 支持 | App端旧版获取值为`{'slotName':true/false}`比如：`{"footer":true}` |
| vm.$refs | 支持 | 支持 | 支持 | 支持 | 非H5端只能用于获取自定义组件，不能用于获取内置组件实例（如：view、text） |
| vm.$isServer | 支持 | 不支持 | 支持 | 不支持 | App端V3总是返回false |
| vm.$attrs | 支持 | 不支持 | 支持 | 不支持 | - |
| vm.$listeners | 支持 | 不支持 | 支持 | 不支持 | - |

## 实例方法

| Vue 实例方法 | H5 | App端旧版 | App端V3 | 微信小程序 | 说明 |
| --- | --- | --- | --- | --- | --- |
| vm.$watch() | 支持 | 支持 | 支持 | 支持 | - |
| vm.$set() | 支持 | 支持 | 支持 | 支持 | - |
| vm.$delete() | 支持 | 支持 | 支持 | 支持 | - |
| vm.$on() | 支持 | 支持 | 支持 | 支持 | - |
| vm.$once() | 支持 | 支持 | 支持 | 支持 | - |
| vm.$off() | 支持 | 支持 | 支持 | 支持 | - |
| vm.$emit() | 支持 | 支持 | 支持 | 支持 | - |
| vm.$mount() | 支持 | 不支持 | 不支持 | 不支持 | - |
| vm.$forceUpdate() | 支持 | 支持 | 支持 | 支持 | - |
| vm.$nextTick() | 支持 | 支持 | 支持 | 支持 | - |
| vm.$destroy() | 支持 | 支持 | 支持 | 支持 | - |

## 模板指令

| Vue 指令 | H5 | App端旧版 | App端V3 | 微信小程序 | 说明 |
| --- | --- | --- | --- | --- | --- |
| v-text | 支持 | 支持 | 支持 | 支持 | - |
| v-html | 支持 | 不支持 | 支持 | 不支持 | - |
| v-show | 支持 | 支持 | 支持 | 支持 | - |
| v-if | 支持 | 支持 | 支持 | 支持 | - |
| v-else | 支持 | 支持 | 支持 | 支持 | - |
| v-else-if | 支持 | 支持 | 支持 | 支持 | - |
| v-for | 支持 | 支持 | 支持 | 支持 | - |
| v-on | 支持 | 支持 | 支持 | 支持 | - |
| v-bind | 支持 | 支持 | 支持 | 支持 | App端旧版不支持`v-bind="{key:value}"`类似用法 |
| v-model | 支持 | 支持 | 支持 | 支持 | - |
| v-pre | 支持 | 不支持 | 支持 | 不支持 | - |
| v-cloak | 支持 | 不支持 | 不支持 | 不支持 | - |
| v-once | 支持 | 不支持 | 支持 | 不支持 | - |

## 特殊属性
| Vue 特殊属性 | H5 | App端旧版 | App端V3 | 微信小程序 | 说明 |
| --- | --- | --- | --- | --- | --- |
| key | 支持 | 支持 | 支持 | 支持 | App端旧版不支持表达式 |
| ref | 支持 | 支持 | 支持 | 支持 | - |
| is | 支持 | 不支持 | 支持 | 不支持 | - |

## 内置组件

| Vue 内置组件 | H5 | App端旧版 | App端V3 | 微信小程序 | 说明 |
| --- | --- | --- | --- | --- | --- |
| component | 支持 | 不支持 | 支持 | 不支持 | - |
| transition | 支持 | 不支持 | 不支持 | 不支持 | - |
| transition-group | 支持 | 不支持 | 不支持 | 不支持 | - |
| keep-alive | 支持 | 不支持 | 支持 | 不支持 | - |
| slot | 支持 | 支持 | 支持 | 支持 | - |

