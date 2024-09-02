`async`函数返回一个 Promise 对象，可以使用`then`方法添加回调函数。当函数执行的时候，一旦遇到`await`就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

指定多少毫秒后输出一个值

```js
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 50);
```

由于`async`函数返回的是 Promise 对象，可以作为`await`命令的参数。所以，上面的例子也可以写成下面的形式。

```js
async function timeout(ms) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}
1
asyncPrint('hello world', 50)
```

`async`函数返回的 Promise 对象，必须等到内部所有`await`命令后面的 Promise 对象执行完，才会发生状态改变，除非遇到`return`语句或者抛出错误。也就是说，只有`async`函数内部的异步操作执行完，才会执行`then`方法指定的回调函数。

```javascript
async function getTitle(url) {
  let response = await fetch(url);
  let html = await response.text();
  return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
getTitle('https://tc39.github.io/ecma262/').then(console.log)
// "ECMAScript 2017 Language Specification"
```

并发发出远程请求，按顺序输出

```javascript
async function logInOrder(urls) {
  // 并发读取远程URL
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });

  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}
```

## forEach和async

```js
function dbFuc(db) { //这里不需要 async
  let docs = [{}, {}, {}];
  // 可能得到错误结果
  docs.forEach(async function (doc) {
    await db.post(doc);
  });
}
```

map/forEach**内部使用了while结合callback方式来执行函数，await不会等待callback的执行**

map/forEach是简单的执行下回调函数，并不会处理异步的情况。

forEach内部的迭代器在回调执行时并没有`await cb(arr[index])`，因此回调几乎是同时执行。

类似于

```js
while(index <arr.length) {
    callback(item,index)
    index++
}
```

[为什么await在forEach/map中不生效？ - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/566467454)

上面代码可能不会正常工作，原因是这时三个`db.post()`操作将是并发执行，也就是同时执行，而不是继发执行。正确的写法是采用`for`循环。

```js
async function dbFuc(db) {
  let docs = [{}, {}, {}];
  for (let doc of docs) {
    await db.post(doc);
  }
}
```

`forEach()` 不会改变其调用的数组，但是，作为 `callbackFn` 的函数可以更改数组。请注意，在第一次调用 `callbackFn` *之前*，数组的长度已经被保存。因此：

- 当调用 `forEach()` 时，`callbackFn` 不会访问超出数组初始长度的任何元素。
- 已经访问过的索引的更改不会导致 `callbackFn` 再次调用它们。
- 如果 `callbackFn` 更改了数组中已经存在但尚未访问的元素，则传递给 `callbackFn` 的值将是在访问该元素时的值。已经被[删除](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/delete)的元素不会被访问。

[Array.prototype.forEach() - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

## async异常处理

```js
/**  
 * @param {Promise} promise  
 * @param {Object=} errorExt - Additional Information you can pass to the err object  
 * @return {Promise}  
 */  
export function to(promise, errorExt) {  
  return promise  
    .then((data) => [null, data])  
    .catch((err) => {  
      if (errorExt) {  
        const parsedError = Object.assign({}, err, errorExt);  
        return [parsedError, undefined];  
      }  
  
      return [err, undefined];  
    });  
}  
// 简版的实现
export default function to(promise) {
   return promise.then(data => {
      return [null, data];
   })
   .catch(err => [err]);
}

  
export default to;

async function asyncFunctionWithThrow() {
  const [err, user] = await to(UserModel.findById(1));
  if (!user) throw new Error('User not found');
}

```

参考资料

[使用await-to-js优雅地解决使用await等待的promise的异常处理 promise中reject的信息要用 - 掘金 (juejin.cn)](https://juejin.cn/post/7076243357256646663)



## 面试题

```js
Promise.resolve().then(() => {
  console.log(0);
  return Promise.resolve(4)
}).then(res => {
  console.log(res)
})

Promise.resolve().then(() => {
  console.log(1);
}).then(() => {
  console.log(2);
}).then(() => {
  console.log(3);
}).then(() => {
  console.log(5);
}).then(() =>{
  console.log(6);
})

// 输出：0 1 2 3 4 5 6
```

参考资料

【难度拉满的Promise魔鬼面试题【渡一教育】】 https://www.bilibili.com/video/BV1Nh4y127EM/?share_source=copy_web&vd_source=dc1323228f1470bd561672c18d78adf3

## Promise.all实现

```js
Promise.myAll = function (proms) {
    let res, rej;
    const p = new Promise((resolve, reject) => {
        res = resolve;
        rej = reject;
    });

    let result = [];
    let count = 0;
    let fullfilledCount = 0;
    let i = 0;
    for (const prom of proms) {
        let index = i;
        i++;
        count++;
        Promise.resolve(prom).then((data) => {
            result[index] = data;
            fullfilledCount++;
            if (fullfilledCount == count) {
                res(result);
            }
        }, rej);
        if (count == 0) {
            res(result);
        }
    }
    return p;
};

```

参考资料

【手写 Promise.all【渡一教育】】 https://www.bilibili.com/video/BV1mG411178Y/?share_source=copy_web&vd_source=dc1323228f1470bd561672c18d78adf3

## Promise.withResolvers

**`Promise.withResolvers()`** 静态方法返回一个对象，其包含一个新的 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 对象和两个函数，用于解决或拒绝它，对应于传入给 [`Promise()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise) 构造函数执行器的两个参数。

```js
const { promise, resolve, reject } = Promise.withResolvers();
```

