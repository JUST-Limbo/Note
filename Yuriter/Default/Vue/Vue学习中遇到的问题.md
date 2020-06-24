# Vue学习中遇到的问题

## 在脚手架中自定义全局组件时报错

使用template自定义组件

```javascript
Vue.component('hello-component', {
  template: "<div ><h1>组件定义之全局组件</h1><h4>{{message}}</h4></div>",
  props: ["message"]
});
```

运行后报错
![自定义组件报错]($resource/%E8%87%AA%E5%AE%9A%E4%B9%89%E7%BB%84%E4%BB%B6%E6%8A%A5%E9%94%99.png)
原因：
在项目配置的时候，默认 `npm` 包导出的是运行时构建，即 `runtime` 版本，不支持编译 `template` 模板。
vue 在初始化项目配置的时候，有两个运行环境配置的版本：`Compiler` 版本、`Runtime` 版本。
`Compiler` 版本可以对 `template` 模板内容进行编译（包括字符串模板和可以绑定的 html 对象作为模板）。

解决：修改vue.config.js
```javascript
module.exports = {
  // 是否使用包含运行时编译器的Vue核心的构建
  runtimeCompiler: false,
  ...
}
```

## 项目中需要注册非常多的自定义组件时

这个例子作为参考

```javascript
// myUI.js
import shengdanComponent from './shengdan01.vue'
import newyearComponent from './newyear.vue'
import yurunComponent from './yurun.vue'
import zhongshangComponent from './zhongshang.vue'
const myUI = {
  install: (vue, config) => {
    vue.component('shengdan01', shengdanComponent)
    vue.component('yurun', yurunComponent)
    vue.component('zhongshang', zhongshangComponent)
    vue.component('newyear', newyearComponent)
  }
}
export default myUI

// main.js
import myUI from './myui/myui'
Vue.use(myUI)
```
