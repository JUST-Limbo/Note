---
note: 路由模块自动化引入
---
# 使用require.context实现前端工程自动化

## require.context是什么

一个webpack的api，通过执行require.context函数获取一个指定的上下文，主要用来实现自动化导入模块，在前端工程中，如果遇到从一个文件夹引入很多模块的情况，可以使用这个api，它会遍历文件夹中的指定文件，然后自动导入，使得不需要每次显示的调用import导入模块。

## 什么时候需要用到require.context

如果有以下情况，可以考虑使用require.context替换。

![index.js]($resource/index.js.jpg)

![modules]($resource/modules.jpg)

在Vue写的项目中，我把路由通过不同的功能划分成不同的模块，在index.js中一个个导入，但是如果项目变大了以后，每次手动import会显得有些力不从心，这里可以使用require.context函数遍历modules文件夹的所有文件一次性导入到index.js中。

## 分析require.context

require.context函数接收三个参数：
1. directory {String} - 读取文件的路径
2. useSubdirectories {Boolean} - 是否遍历文件的子目录
3. regExp {RegExp} - 匹配文件的正则

语法：`require.context(directory, useSubdirectories = false, regExp = /^.//)`
借用webpack官网的例子：
`require.context('./test', false, /.test.js$/);`
上面的代码遍历当前目录下的test文件夹的所有.test.js结尾的文件，不遍历子目录。
大概用图片来表示的话就是这样子的：

![example]($resource/example.jpg)

在index.js中调用**require.context(‘./test’, false, /.test.js$/)**会得到test文件夹下3个文件的执行环境。
值得注意的是require.context函数执行后返回的是一个**函数**，并且这个函数有3个属性：
1. resolve {Function} - 接受一个参数request，request为test文件夹下面匹配文件的相对路径，返回这个匹配文件相对于整个工程的相对路径；
2. keys {Function} - 返回匹配成功模块的名字组成的数组；
3. id {String} - 执行环境的id，返回的是一个字符串，主要用在module.hot.accept热加载

## 结合工程看一下这三个属性返回了什么

我们在里层的modules文件夹新建一个index.js，用来收集所有的模块然后一次性导出给外层的index.js。

![router-modules]($resource/router-modules.jpg)

这里我们先上代码，代码是写在里层的index.js中的：
```javascript
const files = require.context('.', false, /\.js$/);

let configRouters = [];

/**
 * inject routers
 */
files.keys().forEach(key => {
  if (key === './index.js') return
  // 读取出文件中的default模块
  configRouters = configRouters.concat(files(key).default);
})

export default configRouters // 抛出一个Vue-router期待的结构的数组
```

这里我把require.context函数执行后的代码赋值给了files变量，files中保存了图router-modules中以.js结尾的文件，files是个函数，我们分别调用这三个属性看看返回什么

```javascript
console.log(files);
console.log('keys:', files.keys());
console.log('id:', files.id);
```

![控制台打印结果]($resource/%E6%8E%A7%E5%88%B6%E5%8F%B0%E6%89%93%E5%8D%B0%E7%BB%93%E6%9E%9C.jpg)

可以看到，执行了keys方法返回了一个由匹配文件的文件名组成的数组。
id属性返回了匹配的文件夹相对于工程的相对路径，是否遍历子目录，匹配正则组成的字符串。
对于resolve方法可以看到它是一个函数接受req参数，经过实践我发现这个req参数的值是keys方法返回的数组的元素，接着我们传入其中一个元素执行resolve函数。

```javascript
console.log(files);
console.log('keys:', files.keys());
console.log('id:', files.id);
console.log('resolve:', files.resolve(files.keys()[0]));
```

![控制台打印结果2]($resource/%E6%8E%A7%E5%88%B6%E5%8F%B0%E6%89%93%E5%8D%B0%E7%BB%93%E6%9E%9C2.jpg)

resolve方法返回了一个字符串代表着传入参数的文件相对于整个工程的相对路径。
同时files作为一个函数，也接受一个参数req，这个和resolve方法的req参数是一样的，即匹配的文件名的相对路径，而files函数返回的是一个模块，这个模块才是我们真正需要的


```javascript
console.log(files);
console.log('keys:', files.keys());
console.log('id:', files.id);
console.log('resolve:', files.resolve(files.keys()[0]));
console.log('module', files(files.keys()[0]));
```

![控制台打印结果3]($resource/%E6%8E%A7%E5%88%B6%E5%8F%B0%E6%89%93%E5%8D%B0%E7%BB%93%E6%9E%9C3.jpg)

这个module模块和使用import导入的模块是一样的。

## 回到工程

* 首先调用require.context导入某个文件夹中的所有匹配文件，返回执行上下文的环境赋值给files变量；
* 声明一个configRouters用来暴露给外层的index.js作为vue-router的数组；
* 调用files函数的keys方法返回modules文件夹下所有以.js结尾的文件的文件名，返回文件名组成的数组；
* 遍历数组每一项，如果是index.js就跳过，调用files函数传入遍历的元素返回一个Module模块；
* 因为我的路径是用export.default导出的，所以在Module的default属性中获取到我导出的内容，类似这种样子：
```javascript
export default [
  {
    //注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
    path: '/pages/news/index',
    aliasPath: '/', //对于h5端你必须在首页加上aliasPath并设置为/
    name: 'index',
    meta: {
      title: '首页',
    },
  },
  {
    path: 'pages/detail/detail',
    name: 'detail',
    meta: {
      title: '详情',
    },
  },
]
```

* 在外层的index.js中引入暴露出来的路由结构数组configRouters，并放到new Route中：
```javascript
import configRouters from './modules'

//初始化
const router = new Router({
  routes: [...configRouters] //路由表
});
```


