# React

## JSX表达式

全称：JavaScript XML

本质是`React.createElement(component,props,...children)`方法的语法糖

作用：简化创建`React`虚拟DOM(元素)对象，最终产生的就是一个JS对象

基本语法规则

+ 遇到`<`开头的代码，以标签的语法解析：html同名标签转换为html同名元素，其他标签需要特别解析
+ 遇到以`{`开头的代码，以JS语法解析：标签中`JS表达式`必须用`{}`包含
+ 元素的类名列表的属性名，应使用`className`而不是`class`
+ 元素的内联样式，要用`style={{key:value}}`的形式
+ 只有一个根标签
+ 标签必须闭合，单标签需要以`/>`结尾
+ 标签首字母小写，则转为同名的html元素，如果没有对应同名元素则报错
+ 标签首字母大写，则渲染对应组件，若组件未定义则报错

 

## 组件间通信

### 通过props传递

### 使用消息订阅(subscribe)-发布(publish)机制

工具库：PubSubJS

安装：`npm i pubsub-js --save`



jsx中的单标签必须以`/>`结尾 如 `<img src="" /> `

 

## 脚手架

`react-scripts eject` 暴露webpack配置



## 类组件

+ 组件名称大写（不管是类组件 函数组件）

+ 类组件必须继承自`React.Component`

+ 类组件必须实现`render`函数

  

