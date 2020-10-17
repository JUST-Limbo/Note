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