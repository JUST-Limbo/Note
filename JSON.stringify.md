# JSON.stringify

## 参考文献：

[你会用JSON.stringify()?](https://mp.weixin.qq.com/s?__biz=Mzg5ODA5NTM1Mw==&mid=2247493740&idx=1&sn=b7b42aa25c5a366e62d596dcb142dd28&chksm=c06569faf712e0ec424babcc36475de32a7b667f845eacfb60c7a1524e3db4d65e1298822685&scene=132#wechat_redirect)

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)

## 语法

> JSON.stringify(value[, replacer [, space]])

### **参数**

- `value`

  将要序列化成 一个 JSON 字符串的值。

- `replacer` 可选

  如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；如果该参数为 null 或者未提供，则对象所有的属性都会被序列化。

- `space` 可选

  指定缩进用的空白字符串，用于美化输出（pretty-print）；如果参数是个数字，它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格；如果该参数为字符串（当字符串长度超过10个字母，取其前10个字母），该字符串将被作为空格；如果该参数没有提供（或者为 null），将没有空格。

### 第二个参数--过滤器

**如果第二个参数是一个数组**，那么`JSON.stringify()`返回的结果只会包含该数组中列出的对象属性。比如下面的例子：

```js
let json1 = {
  title: "Json.stringify",
  author: [
    "浪里行舟"
  ],
  year: 2021,
  like: 'frontend',
  weixin: 'frontJS'
};
let jsonText = JSON.stringify(json1, ['weixin']);
```

在这个例子中，JSON.stringify()方法的第二个参数是一个包含一个字符串的数组："weixin"。它对应着要序列化的对象中的属性，因此结果JSON字符串中只会包含这个属性：

```JSON
"{"weixin":"frontJS"}"
```

**如果第二个参数是一个函数**，则行为又有不同。提供的函数接收两个参数：属性名（key）和属性值（value）。可以根据这个key决定要对相应属性执行什么操作。这个key始终是字符串，只是在值不属于某个键/值对时会是空字符串。

```js
const students = [
  {
    name: 'james',
    score: 100,
  }, {
    name: 'jordon',
    score: 60,
  }, {
    name: 'kobe',
    score: 90,
  }
];

function replacer (key, value) {
  if (key === 'score') {
    if (value === 100) {
      return 'S';
    } else if (value >= 90) {
      return 'A';
    } else if (value >= 70) {
      return 'B';
    } else if (value >= 50) {
      return 'C';
    } else {
      return 'E';
    }
  }
  return value;
}
console.log(JSON.stringify(students, replacer, 4))
```

上面的代码，我们通过replacer将成绩从百分制替换为成绩等级。

![图片](imgs/640-1620367180525)

如果stringify的第二个参数为函数，且它的返回值**如果是undefined，那么对应的属性不会被序列化**，如果返回其他的值，那么用返回的值替代原来的值进行序列化。

## toJSON()--自定义JSON序列化

**有时候，对象需要在`JSON.stringify()`之上自定义JSON序列化**。此时，可以在要序列化的对象中添加`toJSON()`方法，序列化时会基于这个方法返回适当的JSON表示。

下面的对象为自定义序列化而添加了一个toJSON()方法：

```js
let json1 = {
  title: "Json.stringify",
  author: [
    "浪里行舟"
  ],
  year: 2021,
  like: 'frontend',
  weixin: 'frontJS',
  toJSON: function () {
    return this.author
  }
};
console.log(JSON.stringify(json1)); // ["浪里行舟"]
```

注意，**箭头函数不能用来定义toJSON()方法**。主要原因是箭头函数的词法作用域是全局作用域，在这种情况下不合适。

## 使用场景

### 判断对象是否相等

可以使用`JSON.stringify()`方法,来判断两个对象是否相等。

```js
// 判断对象是否相等
let obj1 = {
    a: 1,
    b: 2
  }
  let obj2 = {
    a: 1,
    b: 2,
  }
console.log(JSON.stringify(obj1) === JSON.stringify(obj2)) // true
```

不过这种方式存在着较大的局限性，**对象如果调整了键的顺序，就会判断出错！**

```js
// 调整对象键的位置后
let obj1 = {
    a: 1,
    b: 2
  }
  let obj2 = {
    b: 2,
    a: 1,
  }
console.log(JSON.stringify(obj1) === JSON.stringify(obj2)) // false
```



### 对象深拷贝

这种方法虽然可以实现数组或对象深拷贝,**但不能处理函数和正则**，因为这两者基于`JSON.stringify`和`JSON.parse`处理后，得到的正则就不再是正则（变为空对象），得到的函数就不再是函数（变为`null`）了。



## 注意事项

有些属性无法被stringify

+ NaN 和 Infinity 格式的数值及 null 都会被当做 null

+ 被转换值中有 undefined、任意的函数以及 symbol 值（不是键而是键值）

  + 数组中的`undefined`、任意的函数以及`symbol`值在序列化的过程中会被转换成 `null`

    ```js
    JSON.stringify([undefined, function () { }, Symbol("")]);
    // '[null,null,null]'
    ```

  + 非数组中的`undefined`、任意的函数以及`symbol`值在序列化的过程中会被忽略

    ```js
    JSON.stringify({ x: undefined, y: function () { }, z: Symbol("") });
    // '{}'
    ```

  + 函数、undefined 被单独转换时，会返回 undefined，如`JSON.stringify(function(){})` or `JSON.stringify(undefined)`.

+ 循环引用

  如果一个对象的属性值通过某种间接的方式指回该对象本身，那么就是一个循环引用。比如：

  ```js
  let bar = {
    a: {
      c: foo
    }
  };
  let foo = {
    b: bar
  };
  
  JSON.stringify(foo)
  ```

  这种情况下，序列化会报错的：

  ```js
  // 错误信息
  Uncaught ReferenceError: foo is not defined
      at <anonymous>:3:8
  ```

+ 含有不可枚举的属性值

  不可枚举的属性默认会被忽略：

  ```js
  let personObj = Object.create(null, {
    name: { value: "浪里行舟", enumerable: false },
    year: { value: "2021", enumerable: true },
  })
  
  console.log(JSON.stringify(personObj)) // {"year":"2021"}
  ```

  











