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
