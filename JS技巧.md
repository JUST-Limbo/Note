[学会这些鲜有人知的coding技巧，从此早早下班liao-JavaScript实战技巧篇 (juejin.cn)](https://juejin.cn/post/6981983593350463519#heading-0)

## 数组的对象解构

使用对象解构将数组项赋值给变量：

```js
const str = "1997,kangkang,boy,23"
const {1:name,2:sex,0:age} = str.split(',')
console.log(name,sex,age) //kangkang boy 1997
```

注：本例中，2 为 split 之后的数组下标，sex 为指定的变量，值为 boy

## 清空和截短数组

```js
const arr = [1,2,3,4,5,6,7,8,9]
arr.length = 5
console.log(arr)//[1,2,3,4,5]
arr.length = 0//清空数组
```

