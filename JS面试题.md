# JS面试题

## 监听元素进入视口

http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html

## 原生拖放

https://www.cnblogs.com/xiaohuochai/p/5886618.html

## 拷贝数组

日常开发中，数组的拷贝是一个会经常遇到的场景。其实实现数组的拷贝有很多骚技巧。

`Array.slice`

```js
const arr = [1, 2, 3, 4, 5];
const copyArr = arr.slice();
```

**展开操作符**

```js
const arr = [1, 2, 3, 4, 5];
const copyArr = [...arr];
```

**使用 `Array` 构造函数和展开操作符**

```js
const arr = [1, 2, 3, 4, 5];
const copyArr = new Array(...arr);
```

`Array.concat`

```js
const arr = [1, 2, 3, 4, 5];
const copyArr = arr.concat();
```



## 数组去重

```js
const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}];
// => [1, '1', 17, true, false, 'true', 'a', {}, {}]
```

**方法1：利用Set**

```js
const res1 = Array.from(new Set(arr));
```

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

`Set`本身是一个构造函数，用来生成 Set 数据结构。

`Set`函数可以接受一个数组（或者具有` iterable` 接口的其他数据结构）作为参数，用来初始化。

`Array.from()` 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。

**方法2：利用`indexOf includes filter`**

```js
const unique2 = arr => {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (res.indexOf(arr[i]) === -1) res.push(arr[i]);
  }
  return res;
}

const unique3 = arr => {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (!res.includes(arr[i])) res.push(arr[i]);
  }
  return res;
}


const unique4 = arr => {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index;
  });
}

```



## 原型链

当谈到继承时，JavaScript 只有一种结构：对象。每个实例对象（ object ）都有一个私有属性（称之为 __proto__ ）指向它的构造函数的原型对象（**prototype** ）。该原型对象也有一个自己的原型对象( __proto__ ) ，层层向上直到一个对象的原型对象为 `null`。根据定义，`null` 没有原型，并作为这个**原型链**中的最后一个环节。

JavaScript 对象是动态的属性“包”（指其自己的属性）。JavaScript 对象有一个指向一个原型对象的链。当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。

```js
/**
 * 对应名称
 * prototype:原型
 * __proto__:原型链 链接点
 * 
 * 从属关系
 * prototype->函数的一个属性 :对象{}
 * __proto__ ->对象Object的一个属性 :对象{}
 * 对象的__proto__保存着改对象的构造函数的prototype
 */
function Test(params) {
  this.a = 1
  this.b = 333
}
console.log(Test.prototype)

Test.prototype.b = 2

const test = new Test()
console.log(test.__proto__)
console.log(Test.prototype === test.__proto__)

// Test.prototype 也是一个对象,因此它也有__proto__
console.log(Test.prototype.__proto__)
console.log(Object.prototype.__proto__) // 最顶层的__proto__为null 

Object.prototype.c = 3

console.log(test)

/**
 * test:{
 *  b:333,
 *  a:1,
 *  __proto__:Test.prototype={
 *    b:2,
 *    __proto__:Object.prototype={
 *      c:3
 *    }
 *  }
 * }
 */
console.log(test.a)
console.log(test.b)
console.log(test.c)


// Function Object : 既是函数又是对象
console.log(Test.__proto__ === Function.prototype) // true

console.log(Function.__proto__)
console.log(Function.prototype)
console.log(Function.__proto__ === Function.prototype) // true 内置规定

// const obj={}
// const obj=new Object()

console.log(typeof Object) // functon
console.log(Object.__proto__ === Function.prototype) // true
console.log(Object.__proto__ === Function.__proto__) // true

// test => {a:1,b:333}
// 不考察原型链
console.log(test.hasOwnProperty('a')) // true
console.log(test.hasOwnProperty('b')) // true
console.log(test.hasOwnProperty('c')) // false

// 考察原型链
console.log('a' in test) // true
console.log('b' in test) // true
console.log('c' in test) // true

// test.constructor -> 实例化test对象的构造函数
console.log(test.constructor === Test)
function Test1(params) {
  this.a=1111
}
test.constructor=Test1
console.log(test)
console.log(test.__proto__===Test.prototype)

```



## 防抖 节流

防抖

> 本质上是清除上次定时器，重新声明一个新的定时器

```js
const debounce = (func, wait, ...args) => {
  let timeout;
  return function(){
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args)
    },wait);
  }
}
```

```js
// 第一次函数一定执行，不会被第二次覆盖掉
const debounce = (func, wait, ...args) => {
  let timeout;
  return function(){
    const context = this;
    if (timeout) cleatTimeout(timeout);
    let callNow = !timeout;
    timeout = setTimeout(() => {
      timeout = null;
    },wait)
    
    if(callNow) func.apply(context,args)
   }
}
```



```js
let Debounce = function (fn, delay = 300, immediate = false) {
  let timer = null // 闭包存储setTimeout状态
  return function () {
    let self = this // 事件源this
    let args = arguments // 接收事件源的event
    if (timer) {
      clearTimeout(timer) // 清除定时器,timer变量仍然保存着计时器ID
    } // 存在就清除执行fn的定时器
    if (immediate) { // 立即执行
      let callNow = !timer // 执行fn的状态
      console.log(`callNow: `, callNow)
      timer = setTimeout(function () {
        timer = null
      }, delay)
      if (callNow) fn.apply(self, args)
    } else { // 非立即执行
      timer = setTimeout(function () { // 或者使用箭头函数将this指向dom
        fn.apply(self, args)
      }, delay)
    }
  }
}

let con1 = document.querySelector('.con1')
let con2 = document.querySelector('.con2')
let con3 = document.querySelector('.con3')

let addNum = function (args) {
  console.log('addnum')
  // console.log(this, args)
  // this.innerText = (+this.innerText) + 1
}

con1.onclick = addNum // 无防抖

con2.onclick = Debounce(addNum) // 防抖

con3.onclick = Debounce(addNum, 300, true) // 防抖（立即执行）
```

节流

> 节流不需要clearTimeout

```js
const throttle = (func, wait, ...args) => {
  let pre = 0;
  return function(){
    const context = this;
    let now = Date.now();
    if (now - pre >= wait){
       func.apply(context, args);
       pre = Date.now();
    }
  }
}
```

```js
const throttle = (func, wait, ...args) => {
  let timeout;
  return function(){
    const context = this;
    if(!timeout){
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context,args);
      },wait)
    }
  }
}
```



```js
// 是否立即执行
let ThrottlePro = function (fn, delay = 500, immediate = false) {
    let preTime = 0 // 记录上一次执行时间
    return function () {
        let self = this, // 保留执行时候的的this
            args = [...arguments], // 执行时候的传入参数
            nowTime = +new Date(), // 记录当前的时间
            flag = nowTime - preTime >= delay // 执行命令
        if (immediate) { // 是否立即执行
            if (!flag) return
            preTime = nowTime // 更新执行时间
            fn.apply(self, args)
        } else {
            if (!flag) return // 不满足执行条件
            preTime = nowTime
            setTimeout(function () {
                fn.apply(self, args)
            }, delay)
        }
    }
}
```

