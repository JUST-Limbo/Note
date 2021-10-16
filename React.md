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

 

## 类组件

+ 组件名称大写（不管是类组件 函数组件）
+ 类组件必须继承自`React.Component`
+ 类组件必须实现`render`函数



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



## 类组件实例的三大属性-refs

### 字符串形式的ref

```javascript
//创建组件
class Demo extends React.Component{
  //展示左侧输入框的数据
  showData = ()=>{
    const {input1} = this.refs
    alert(input1.value)
  }
  //展示右侧输入框的数据
  showData2 = ()=>{
    const {input2} = this.refs
    alert(input2.value)
  }
  render(){
    return(
      <div>
        <input ref="input1" type="text" placeholder="点击按钮提示数据"/>&nbsp;
        <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
        <input ref="input2" onBlur={this.showData2} type="text" placeholder="失去焦点提示数据"/>
      </div>
    )
  }
}
//渲染组件到页面
ReactDOM.render(<Demo a="1" b="2"/>,document.getElementById('test'))
```

### 回调形式的ref

```javascript
//创建组件
class Demo extends React.Component{
  //展示左侧输入框的数据
  showData = ()=>{
    const {input1} = this
    alert(input1.value)
  }
  //展示右侧输入框的数据
  showData2 = ()=>{
    const {input2} = this
    alert(input2.value)
  }
  render(){
    return(
      <div>
        <input ref={c => this.input1 = c } type="text" placeholder="点击按钮提示数据"/>&nbsp;
        <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
        <input onBlur={this.showData2} ref={c => this.input2 = c } type="text" placeholder="失去焦点提示数据"/>&nbsp;
      </div>
    )
  }
}
//渲染组件到页面
ReactDOM.render(<Demo a="1" b="2"/>,document.getElementById('test'))
```

> ### 关于回调 refs 的说明
>
> 如果 `ref` 回调函数是以内联函数的方式定义的，在更新过程中它会被执行两次，第一次传入参数 `null`，然后第二次会传入参数 DOM 元素。这是因为在每次渲染时会创建一个新的函数实例，所以 React 清空旧的 ref 并且设置新的。通过将 ref 的回调函数定义成 class 的绑定函数的方式可以避免上述问题，**但是大多数情况下它是无关紧要的**。

```javascript
//创建组件
class Demo extends React.Component{

  state = {isHot:false}

  showInfo = ()=>{
    const {input1} = this
    alert(input1.value)
  }

  changeWeather = ()=>{
    //获取原来的状态
    const {isHot} = this.state
    //更新状态
    this.setState({isHot:!isHot})
  }

  saveInput = (c)=>{
    this.input1 = c;
    console.log('@',c);
  }

  render(){
    const {isHot} = this.state
    return(
      <div>
        <h2>今天天气很{isHot ? '炎热':'凉爽'}</h2>
        {/*<input ref={(c)=>{this.input1 = c;console.log('@',c);}} type="text"/><br/><br/>*/}
        <input ref={this.saveInput} type="text"/><br/><br/>
        <button onClick={this.showInfo}>点我提示输入的数据</button>
        <button onClick={this.changeWeather}>点我切换天气</button>
      </div>
    )
  }
}
//渲染组件到页面
ReactDOM.render(<Demo/>,document.getElementById('test'))
```



### createRef

```javascript
//创建组件
class Demo extends React.Component{
  /* 
    React.createRef调用后可以返回一个容器，该容器可以存储被ref所标识的节点,该容器是“专人专用”的
    */
  myRef = React.createRef()
  myRef2 = React.createRef()
  //展示左侧输入框的数据
  showData = ()=>{
    alert(this.myRef.current.value);
  }
  //展示右侧输入框的数据
  showData2 = ()=>{
    alert(this.myRef2.current.value);
  }
  render(){
    return(
      <div>
        <input ref={this.myRef} type="text" placeholder="点击按钮提示数据"/>&nbsp;
        <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
        <input onBlur={this.showData2} ref={this.myRef2} type="text" placeholder="失去焦点提示数据"/>&nbsp;
      </div>
    )
  }
}
//渲染组件到页面
ReactDOM.render(<Demo a="1" b="2"/>,document.getElementById('test'))
```





## 事件处理

React 元素的事件处理和 DOM 元素的很相似，但是有一点语法上的不同：

- React 事件的命名采用小驼峰式（camelCase），而不是纯小写。
- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。

React中的事件是通过事件委托方式处理的(委托给组件最外层的元素)，通过event.target得到发生事件的DOM元素对象。



## 非受控组件与受控组件

### 非受控组件

表单数据交由DOM节点来处理

```javascript
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```



### 受控组件

在 HTML 中，表单元素（如`<input>`、 `<textarea>` 和 `<select>`）通常自己维护 state，并根据用户输入进行更新。而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用 [`setState()`](https://zh-hans.reactjs.org/docs/react-component.html#setstate)来更新。

我们可以把两者结合起来，使 React 的 state 成为“唯一数据源”。渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。

```javascript
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('提交的名字: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="提交" />
      </form>
    );
  }
}
```

由于在表单元素上设置了 `value` 属性，因此显示的值将始终为 `this.state.value`，这使得 React 的 state 成为唯一数据源。由于 `handlechange` 在每次按键时都会执行并更新 React 的 state，因此显示的值将随着用户输入而更新。

对于受控组件来说，输入的值始终由 React 的 state 驱动。



## 高阶函数





## 消息订阅(subscribe)-发布(publish)机制

### 使用消息订阅(subscribe)-发布(publish)机制

工具库：PubSubJS

安装：`npm i pubsub-js --save`



jsx中的单标签必须以`/>`结尾 如 `<img src="" /> `

 

## 脚手架

`react-scripts eject` 暴露webpack配置





