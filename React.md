# React

## JSX表达式

全程：JavaScript XML

本质是`React.createElement(component,props,...children)`方法的语法糖

作用：简化创建`React`虚拟DOM(元素)对象，最终产生的就是一个JS对象

基本语法规则

+ 遇到`<`开头的代码，以标签的语法解析：html同名标签转换为html同名元素，其他标签需要特别解析
+ 遇到以`{`开头的代码，以JS语法解析：标签中`JS表达式`必须用`{}`包含

 

## 组件间通信

### 通过props传递

### 使用消息订阅(subscribe)-发布(publish)机制

工具库：PubSubJS

安装：`npm i pubsub-js --save`



jsx中的单标签必须以`/>`结尾 如 `<img src="" /> `

