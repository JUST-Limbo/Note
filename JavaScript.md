## 1

浏览器下：

```js
// 最终结果 10 10 10 undefined

var obj = {
  age: 18,
  foo: function (func) {
    func() // window.func() 由window调用
    let zz = arguments[0] // window.func() 由window调用
    zz()
    arguments[0]() // arguments.0() 由arguments调用
  }
}
var age = 10
function temp() {
  console.log(this.age);
}
temp() // window.func() 由window调用

obj.foo(temp)
```



## 2

闭包

```js
// 最终结果 11 12 0
var n = 0
function a() {
  var n = 10
  function b() {
    n++ // 10+1
    console.log(n) // 11
  }
  b()
  return b
}
var c = a()
c() // 12
console.log(n) //0

```



## 3

```js
var a = 10
var b = 11
var c = 12
function test(a) { // 形参等同于var a
  a = 1
  var b = 2
  c = 3
}
test(100)
console.log(a) // 10
console.log(b) // 11
console.log(c) // 3

```



## 4

html下：

```js
var num = 10
var obj = { num: 20 }
obj.fn = (function (num) {
  this.num = num * 3 // 20*3
  num++ // 20+1
  return function (n) {
    this.num += n // 5+20*3  // obj.fn(10) 此时this.num指向obj.num 20+10
    num++ // 20+1+1  // 闭包,此处num指向外层匿名函数的num 22+1
    console.log(num)  // 22  // 23
  }
})(obj.num) // 20

var fn = obj.fn
fn(5) // window.fn() 输出 22
obj.fn(10) // 输出 23
console.log(num, obj.num) // 65 30
```

第三行匿名函数自调用，传入实参20，此时函数内的`this.num`指向全局下的`num`

## 5

html下：

```js
let obj = {
    age:20,
    info:function(){
        return () => {
            console.log(this.age)
        }
    }
}
let person = { age:28 }
let info1 = obj.info()
info1() // 20
let info2 = obj.info.call(person)
info2() // 28
```



## 6

**箭头函数不能在call方法修改里面的this**

函数的this可以通过call等显式绑定的方式修改，而为了减少this的复杂性，箭头函数无法用call()来指定this

```js
const obj = {
    a: () => {
        console.log(this)
    }
}
obj.a.call('123')  //打出来的结果依然是window对象
```



## 7

不管我们给函数进行几次bind显式绑定，函数中的this永远由 **第一次bind** 决定

```js
let a = {}
let fn = function(){
    console.log(this)
}
fn.bind().bind(a)() // => Window
```



## 8

```js
var a = 1
let b = 1
const c = 1
console.log(window.a) // 1
console.log(window.b) // undefined
console.log(window.c) // undefined

在全局作用域下使用let和const声明变量，变量并不会被挂载到window上，这一点与var不同

关于const，还有两个注意点：
- const声明之后必须马上赋值，否则报错
- const简单类型一旦声明就不能修改，而复杂类型（数组，对象）指针指向的地址不能修改，但内部数据可以修改
```



## 9

```html
<script>
    let a={}
    b='0'
    c=0
    a[b]='1'
    a[c]=2
    console.log(a[b]) // 2
 </script>
```

## 10

```html
  <script>
    let a={}
    b={
      n: '0'
    }
    c={
      m:'2'
    }
    a[b]='qaz'
    a[c]='abc'
    console.log(a[b]) // 'abc'
  </script>
```

## 11

```html
<script>
    var test=(function(i){
      return function(){
        alert(i*2)
      }
    })(2)
    test(5) // '4' alert默认调用.toString()
</script>
```

## 12

```html
  <script>
    var a = 0, b = 0
    function A(a) {
      A = function (b) {
        alert(a + b++) // a闭包
      }
      alert(a++)
    }
    A(1) // '1'
    A(2) // '4'
  </script>
```

