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

 

## 类组件实例的三大属性-state



## 类组件实例的三大属性-props

### 基本使用

```javascript
//创建组件
class Person extends React.Component{
  render(){
    const {name,age,sex} = this.props
    return (
      <ul>
        <li>姓名：{name}</li>
        <li>性别：{sex}</li>
        <li>年龄：{age+1}</li>
      </ul>
    )
  }
}
//渲染组件到页面
ReactDOM.render(<Person name="jerry" age={19}  sex="男"/>,document.getElementById('test1'))
ReactDOM.render(<Person name="tom" age={18} sex="女"/>,document.getElementById('test2'))

const p = {name:'老刘',age:18,sex:'女'}
// ReactDOM.render(<Person name={p.name} age={p.age} sex={p.sex}/>,document.getElementById('test3'))
ReactDOM.render(<Person {...p}/>,document.getElementById('test3')) // 解构赋值 语法糖

//此处console.log(...p)在babel环境下不会报错,普通js环境下会报错.
//注意区分在传递props时的{...p}写法与通常的{...p}克隆对象字面量写法的差异.传递props时的{}表示解析js
```

### 类型和默认值

> 注意，props是只读的

```javascript
<!-- 引入prop-types，用于对组件标签属性进行限制 -->
<script type="text/javascript" src="../js/prop-types.js"></script>
//创建组件
class Person extends React.Component{
  render(){
    // console.log(this);
    const {name,age,sex} = this.props
    //props是只读的 *********
    //this.props.name = 'jack' //此行代码会报错，因为props是只读的
    return (
      <ul>
        <li>姓名：{name}</li>
        <li>性别：{sex}</li>
        <li>年龄：{age+1}</li>
      </ul>
    )
  }
}
//类的静态属性 对标签属性进行类型、必要性的限制 
Person.propTypes = { // 注意静态属性的键名为propTypes首字母小写,而下方的内置对象PropTypes首字母为大写
  name:PropTypes.string.isRequired, //限制name必传，且为字符串  PropTypes或React.PropTypes
  sex:PropTypes.string,//限制sex为字符串
  age:PropTypes.number,//限制age为数值
  speak:PropTypes.func,//限制speak为函数
}
// PropTypes在React15以前是React内置对象,即React.PropTypes; React16以后弃用,需要引入prop-types

//类的静态属性 指定默认标签属性值
Person.defaultProps = {
  sex:'男',//sex默认值为男
  age:18 //age默认值为18
}
//渲染组件到页面
ReactDOM.render(<Person name={100} speak={speak}/>,document.getElementById('test1'))
ReactDOM.render(<Person name="tom" age={18} sex="女"/>,document.getElementById('test2'))

const p = {name:'老刘',age:18,sex:'女'}
// ReactDOM.render(<Person name={p.name} age={p.age} sex={p.sex}/>,document.getElementById('test3'))
ReactDOM.render(<Person {...p}/>,document.getElementById('test3'))

function speak(){
  console.log('我说话了');
}
```

### 简写

```js
//创建组件
class Person extends React.Component{

  constructor(props){
    //构造器是否接收props，是否传递给super，取决于：是否希望在构造器中通过this访问props
    // console.log(props);
    super(props)
    console.log('constructor',this.props);
  }

  //对标签属性进行类型、必要性的限制
  static propTypes = {
    name:PropTypes.string.isRequired, //限制name必传，且为字符串
    sex:PropTypes.string,//限制sex为字符串
    age:PropTypes.number,//限制age为数值
  }

  //指定默认标签属性值
  static defaultProps = {
    sex:'男',//sex默认值为男
    age:18 //age默认值为18
  }
  
  render(){
    // console.log(this);
    const {name,age,sex} = this.props
    //props是只读的
    //this.props.name = 'jack' //此行代码会报错，因为props是只读的
    return (
      <ul>
        <li>姓名：{name}</li>
        <li>性别：{sex}</li>
        <li>年龄：{age+1}</li>
      </ul>
    )
  }
}

//渲染组件到页面
ReactDOM.render(<Person name="jerry"/>,document.getElementById('test1'))
```

> [React.Component – React (reactjs.org)](https://zh-hans.reactjs.org/docs/react-component.html#constructor)
>
> 在 React 组件挂载之前，会调用它的构造函数。在为 React.Component 子类实现构造函数时，应在其他语句之前前调用 `super(props)`。否则，`this.props` **在构造函数中**可能会出现未定义的 bug。
>
> 这里可以在构造函数中直接访问传入的实参`props`，而不是访问`this.props`
>
> （在构造函数外是可以访问`this.props`的？）



## 函数组件使用props

```javascript
//创建组件
function Person (props){
  const {name,age,sex} = props
  return (
      <ul>
        <li>姓名：{name}</li>
        <li>性别：{sex}</li>
        <li>年龄：{age}</li>
      </ul>
    )
}
Person.propTypes = {
  name:PropTypes.string.isRequired, //限制name必传，且为字符串
  sex:PropTypes.string,//限制sex为字符串
  age:PropTypes.number,//限制age为数值
}

//指定默认标签属性值
Person.defaultProps = {
  sex:'男',//sex默认值为男
  age:18 //age默认值为18
}
//渲染组件到页面
ReactDOM.render(<Person name="jerry"/>,document.getElementById('test1'))
```



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

  

