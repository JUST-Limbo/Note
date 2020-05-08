# Node

- 自动化构建等工具 webpack
- 中间层
- 小项目

## CMD命令行指令

+ dir	列出当前目录下所有文件
+ cd 目录名  进入指定目录
+ md 目录名 创建指定文件夹
+ rd 目录名  删除指定文件夹
+ cls 清空界面







## 模块导出导入

模块共三类：核心模块 第三方模块 用户模块

模块通过使用`module.exports=xxxx;`向外暴露变量(函数)

模块通过使用`var ref=require('module_name')`引用其他模块暴露的变量

```javascript
// 核心模块
var fs = require('fs')

// 第三方模块
// npm i express
var express = require('express')

// 用户模块（自己写的），正确的，正确的方式
// 注意：加载自己写的模块，相对路径不能省略 ./
var foo = require('./foo.js')

// 用户模块（自己写的），正确的（推荐），可以省略后缀名 .js
var foo = require('./foo')
```

`require`的两个作用:

+ 加载文件模块 **执行 **其中代码
+ 拿到被加载文件模块导出的接口对象

### 文件组成

node在执行模块中代码时，

在执行文件内容的头部添加

 `(function (exports, require, module, __filename, __dirname) { `

在执行文件内容尾部添加

 `});`

（闭包？）

模块中的代码都是包装在一个函数中执行的，并且在函数执行的同时传入5个实参

五个实参虽然看起来是全局的，但其实并不是。 它们仅存在于模块范围内，可以全局访问但不是全局对象(`global`)

+ exports: 该对象用来将函数内部的局部变量或局部函数暴露到外部 默认为空
+ require: 函数  用来引入外部的模块
+ module: 代表的是当前模块本身, exports就是module的属性; 我们既可以使用 exports 导出，也可以使用module.exports导出
+ __filename: 当前模块的完整路径  通常在文件操作中于`path`模块搭配使用
+ __dirname: 当前模块所在文件夹的完整路径  通常在文件操作中于`path`模块搭配使用

`__dirname`和`__filename`是不受执行node命令所属路径影响的

> 此处可以通过输出`arguments.callee`进行验证

### moudle.exports  vs  exports

`exports`变量存的是`module.exports`的地址

高程 P69-70



## 核心模块



### querystring查询字符串

用于解析和格式化URL查询字符串

`querystring.parse()`

`querystring.stringify()`

----------------





### url地址操作



--------------





### path路径操作

| api              | 作用                                         |
| ---------------- | -------------------------------------------- |
| path.basename    | 返回path的最后一部分                         |
| path.dirname     | 返回 path 的目录名，尾部的目录分隔符将被忽略 |
| **path.join**    | 拼接字符串 常用于`fs文件操作`                |
| **path.resolve** | 将路径或路径片段的序列解析为绝对路径         |

**path.resolve()**

```js
var path = require("path")     //引入node的path模块

path.resolve('/foo/bar', './baz')   // returns '/foo/bar/baz'
path.resolve('/foo/bar', 'baz')   // returns '/foo/bar/baz'
path.resolve('/foo/bar', '/baz')   // returns '/baz'
path.resolve('/foo/bar', '../baz')   // returns '/foo/baz'
path.resolve('home','/foo/bar', '../baz')   // returns '/foo/baz'
path.resolve('home','./foo/bar', '../baz')   // returns '/home/foo/baz'
path.resolve('home','foo/bar', '../baz')   // returns '/home/foo/baz'
```

> 1. 从后向前，若字符以 / 开头，不会拼接到前面的路径(`因为拼接到此已经是一个绝对路径`)；若以 ../ 开头，拼接前面的路径，且不含最后一节路径；若以 ./ 开头 或者没有符号 则拼接前面路径；
>
> 2. 如果在处理完所有给定的 `path` 片段之后还未生成绝对路径，则再加上当前工作目录。
> 3. 如果没有传入 `path` 片段，则 `path.resolve()` 将返回当前工作目录的绝对路径。

-------------------



### fs文件操作

所有文件系统操作都具有同步和异步两种形式

异步操作的回调函数通常作为其最后一个参数，回调函数的第一个参数始终预留用于异常，如果操作成功完成，则第一个参数将为 `null` 或 `undefined`。第二个参数代表结果。

同步的操作发生的异常会立即抛出，可以使用 `try…catch` 处理，函数直接返回结果。

> 在文件操作中，使用相对路径是不可靠的，因为在Node中文件操作的路径被设计为相对于执行node命令所处的路径，所以可以把相对路径转为绝对路径来解决问题，即使用`__dirname`和`__filename`，推荐配合`path.join()`辅助拼接来避免拼接错误。
>
> 注：模块中的路径标识和这里的路径没关系，不受node操作路径影响（相对于文件模块）。

#### 文件读取

fs.readFile(path[, options],callback)

异步地读取文件的**全部**内容

```js
fs.readFile('/etc/passwd', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

回调传入两个参数`(err,data)`,其中 `data` 是文件的内容。

如果没有指定 `encoding`，则返回原始的 buffer。

如果 `options` 是字符串，则它指定字符编码：

对于非媒体类型（如纯文本）的文件可以用 `toString()` 转换一下，媒体类型的文件以后则会以流的方式进行读取，要是强行用 `toString()` 转换的话会丢失掉原始信息，所以不能乱转。



#### 文件重写

fs.writeFile(file, data[, options],callback)

异步地将数据写入到一个文件，如果文件已存在则覆盖该文件。 

如果传入的数据是String，默认按UTF-8编码写入文本文件，如果 `data` 是一个 buffer，则 `encoding` 选项会被忽略。

```js
fs.writeFile('文件.txt', data, (err) => { // 没有data 只关心成功与否
  if (err) throw err;
  console.log('文件已被保存');
});
```

如果 `options` 是一个字符串，则它指定字符编码：

```js
fs.writeFile('文件.txt', 'Node.js中文网', 'utf8', callback);
```

在同一个文件上多次使用 `fs.writeFile()` 且不等待回调是不安全的。 对于这种情况，建议使用 `fs.createWriteStream()`。



#### 文件状态

fs.stat(path[, options],callback)

```js
fs.stat('sample.txt', function (err, stat) {
    if (err) {
        console.log(err);
    } else {
        // 是否是文件:
        console.log('isFile: ' + stat.isFile());
        // 是否是目录:
        console.log('isDirectory: ' + stat.isDirectory());
        if (stat.isFile()) {
            // 文件大小:
            console.log('size: ' + stat.size);
            // 创建时间, Date对象:
            console.log('birth time: ' + stat.birthtime);
            // 修改时间, Date对象:
            console.log('modified time: ' + stat.mtime);
        }
    }
});
```



#### 流式读取

```js
var fs=require('fs')
var rs=fs.createReadStream('hello.txt')

rs.once('open',function(){
  console.log('ReadStream open')
})
rs.once('close',function(){ // 监听end事件也可
  console.log('ReadStream close')
})
//必须要位可读流绑定一个data事件,才能读取可读流中的数据
rs.on('data',function(chunk){
  console.log(chunk)
})
```



#### 流式写入

```js
var fs=require('fs')
var ws=fs.createWriteStream('hello.txt')
ws.once('open',function(){
  console.log('writestream open')
})
ws.once('close',function(){
  console.log('writestream close')
})

ws.write('写入文件的内容')
ws.write('写入文件的内容')
ws.write('写入文件的内容')
ws.write('写入文件的内容')
ws.write('写入文件的内容')
ws.end() //'end' 事件只有在数据被完全消费掉后才会触发 不采取ws.close()
```

>  没有直接使用 stream 模块，是因为 fs 模块引用了它并对其做了封装

#### 可读流的pipe方法

`readable.pipe()` 方法绑定可写流到可读流，将可读流的所有数据推送到绑定的可写流。 

`readable.pipe()` 会返回目标流的引用，这样就可以对流进行链式地管道操作。(gzip)

可读流数据读取完后自动关闭可写流，可通过参数配置不自动关闭可写流



----------------------------------------------



### http通信

既可以模拟浏览器向web服务器发请求，也可以创建web服务器 

#### 创建web服务器

应用程序并不直接和HTTP协议打交道，而是操作`http`模块提供的`request`和`response`对象。（可读可写的数据流？）

`request`对象封装了HTTP请求，调用`request`对象的属性和方法就可以拿到所有HTTP请求的信息；

`response`对象封装了HTTP响应，操作`response`对象的方法，就可以把HTTP响应返回给浏览器。

##### 创建服务器

###### http.createServer( [options] [, requestListener])

+ 返回新的 `http.Server` 实例。

+ `requestListener` 一个自动添加到 `request` 事件的函数。

```js
var http = require('http');

// 创建http server，直接传入回调函数，默认监听request:
var server = http.createServer(function (request, response) {
    console.log(request.method + ': ' + request.url);
    // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
    response.writeHead(200, {'Content-Type': 'text/html'});
    // 将HTTP响应的HTML内容写入response:
    response.end('<h1>Hello world!</h1>');
});

// 让服务器监听8080端口:
server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');
```



```js
var http = require('http')
var server = http.createServer()
server.on('request', (req, res) => {
  var url = req.url
  if (url === '/plain') {
    // text/plain 普通文本
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.setHeader('Content-Type', 'text/plain;charset=utf-8')
    res.end('hello')
  } else if (url === '/html') {
    // 如果发送的是html格式的字符串 则要告诉浏览器发送的是text/html格式的内容
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.setHeader('Content-Type','text/html;charset=utf-8')
    res.end('<p>hello html<a href="#">123</a></p>')
  } 
})

server.listen(80, function () {
  console.log('服务器已启动 端口号: 80');
})
```



##### req请求对象

req.method 

req.url 

req.headers



##### res响应对象

###### res.writeHead(statusCode[, statusMessage] [, headers])

+ statusCode	3位的HTTP状态码

+ statusMessage	用户可读的状态信息

+ headers<object>	响应头 { key : value , ... }

  向请求发送响应头，返回response的引用，以便支持**链式调用**

  此方法只能在消息上调用一次，并且必须在调用 `response.end()`之前调用。

  当使用 `response.setHeader()`设置响应头时，则与传给 `response.writeHead()`的任何响应头合并，且`response.writeHead()`的优先。

###### res.setHeader(name, value)

+ name	响应头字段名称
+ value	值

```js
#服务端重定向针对异步请求无效
如何通过服务器让客户端重定向
1.将状态码设置为302 临时重定向
statusCode
2.在响应头中通过Location告诉客户端往哪儿重定向
setHeader()
如果客户端发现收到服务器的响应的状态302 就会自动去响应头中找Location 并发送新的请求
res.statusCode=302
res.setHeader('Location','/')
```

###### res.write(chunk[, encoding] [, callback])

设置响应内容，并没有发送

`chunk`必须是**二进制数据**或**字符串**

###### res.end([data[, encoding ]] [, callback])

响应结束的标识

此方法向服务器发出信号，表明已发送所有响应头和主体，该服务器应该视为此消息已完成。 必须在每个响应上调用此 `response.end()` 方法。

如果指定了 `data`，则相当于调用 [`response.write(data, encoding)`](http://nodejs.cn/s/gvWo3m) 之后再调用 `response.end(callback)`。

如果指定了 `callback`，则当响应流完成时将调用它。



#### 模拟浏览器发送请求

##### http.request()

```js
const postData = querystring.stringify({
  'msg': 'hello world'
});

const options = {
  hostname: 'nodejs.cn',
  port: 80,
  path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  console.log(`状态码: ${res.statusCode}`);
  console.log(`响应头: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`响应主体: ${chunk}`);
  });
  res.on('end', () => {
    console.log('响应中已无数据');
  });
});

req.on('error', (e) => {
  console.error(`请求遇到问题: ${e.message}`);
});

// 将数据写入请求主体。
req.write(postData);
req.end();
```

可选的 `callback` 参数会作为单次监听器被添加到 `response`事件。

`http.request()` 返回 `http.ClientRequest` 类的实例。 `ClientRequest` 实例是一个可写流。 

 如果需要使用 POST 请求上传文件，则写入到 `ClientRequest` 对象。

使用 `http.request()` 时，必须始终调用 `req.end()` 来表示请求的结束，即使没有数据被写入请求主体。

```js
let option ={
          host:"127.0.0.1",   //请求host
          path:"/uploadFile",  //请求链接
          port:3000,            //端口
          method:"POST",  //请求类型
          headers:{   //请求头
            
                'Content-Type': 'application/octet-stream',//数据格式为二进制数据流
                'Transfer-Encoding': 'chunked',//传输方式为分片传输
                'Connection': 'keep-alive'   //这个比较重要为保持链接。
          }
      }
      let req  = http.request(option);
                 
                 fs.createReadStream(path.join(__dirname,"pic.png"))
                   .on("open",chunk=>{
                   })
                   .on("data",chunk=>{
                       req.write(chunk);  //发送数据
                   })
                   .on("end",()=>{
                      req.end();   //发送结束
                   })
```



##### http.get()

与` http.request()` 的唯一区别是它将方法设置为` GET `并自动调用 `req.end()`。

```js
http.get('http://nodejs.cn/index.json', (res) => {
  const { statusCode } = res;
  const contentType = res.headers['content-type'];

  let error;
  if (statusCode !== 200) {
    error = new Error('请求失败\n' +
                      `状态码: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error('无效的 content-type.\n' +
                      `期望的是 application/json 但接收到的是 ${contentType}`);
  }
  if (error) {
    console.error(error.message);
    // 消费响应数据来释放内存。
    res.resume();
    return;
  }

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData);
      console.log(parsedData);
    } catch (e) {
      console.error(e.message);
    }
  });
}).on('error', (e) => {
  console.error(`出现错误: ${e.message}`);
});
```



---



### zlib数据压缩

#### 文件的压缩/解压

```js
const zlib = require('zlib')
const gzip = zlib.createGzip();
const fs = require('fs');
const inp = fs.createReadStream('李宗盛-山丘.mp3');
const out = fs.createWriteStream('李宗盛-山丘.mp3.gz');

inp.pipe(gzip)
  .on('error', () => {
    // 处理错误
  })
  .pipe(out)
  .on('error', () => {
    // 处理错误
  });
```

一步完成压缩/解压 deflate inflate    decrease increase

```js
const input = '.................................';
// 压缩
zlib.deflate(input, (err, buffer) => {
  if (!err) {
    console.log(buffer.toString('base64'));
  } else {
    // 处理错误
  }
});

const buffer = Buffer.from('eJzT0yMAAGTvBe8=', 'base64');
// 解压
zlib.unzip(buffer, (err, buffer) => {
  if (!err) {
    console.log(buffer.toString());
  } else {
    // 处理错误
  }
});
```



#### HTTP数据流的压缩/解压

在服务器中和客户端的传输过程中，浏览器（客户端）通过` Accept-Encoding `消息头来告诉服务端接受的压缩编码，服务器通过 `Content-Encoding `消息头来告诉浏览器（客户端）实际用于编码的算法。

如果不配置响应头浏览器会下载`.gz`文件

客户端识别 Accept-Encoding 字段，并进行解压：

```js
// 客户端请求示例。
const zlib = require('zlib');
const http = require('http');
const fs = require('fs');
const request = http.get({ host: 'example.com',
                           path: '/',
                           port: 80,
                           headers: { 'Accept-Encoding': 'br,gzip,deflate' } });
request.on('response', (response) => {
  const output = fs.createWriteStream('example.com_index.html');

  switch (response.headers['content-encoding']) {
    case 'br':
      response.pipe(zlib.createBrotliDecompress()).pipe(output);
      break;
    // 或者, 只是使用 zlib.createUnzip() 方法去处理这两种情况：
    case 'gzip':
      response.pipe(zlib.createGunzip()).pipe(output);
      break;
    case 'deflate':
      response.pipe(zlib.createInflate()).pipe(output);
      break;
    default:
      response.pipe(output);
      break;
  }
});
```

服务器代码示例如下：

```js
// 服务端示例。
// 对每一个请求运行 gzip 操作的成本是十分高昂的。
// 缓存已压缩的 buffer 是更加高效的方式。
const zlib = require('zlib');
const http = require('http');
const fs = require('fs');
http.createServer((request, response) => {
  const raw = fs.createReadStream('index.html');
  // 存储资源的压缩版本和未压缩版本。
  response.setHeader('Vary: Accept-Encoding');
  let acceptEncoding = request.headers['accept-encoding'];
  if (!acceptEncoding) {
    acceptEncoding = '';
  }

  // 注意：这不是一个合适的 accept-encoding 解析器。
  // 查阅 https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.3
  if (/\bdeflate\b/.test(acceptEncoding)) {
    response.writeHead(200, { 'Content-Encoding': 'deflate' });
    raw.pipe(zlib.createDeflate()).pipe(response);
  } else if (/\bgzip\b/.test(acceptEncoding)) {
    response.writeHead(200, { 'Content-Encoding': 'gzip' });
    raw.pipe(zlib.createGzip()).pipe(response);
  } else if (/\bbr\b/.test(acceptEncoding)) {
    response.writeHead(200, { 'Content-Encoding': 'br' });
    raw.pipe(zlib.createBrotliCompress()).pipe(response);
  } else {
    response.writeHead(200, {});
    raw.pipe(response);
  }
}).listen(8080);
```



> 1.为什么有的时候文件展示在浏览器中，有时候是下载下来?
>
> 不压缩不设置响应头是直接展示，压缩了不设置响应头是下载
>
> https://juejin.im/post/5d27dd2de51d454f6f16ec89
>
> 2.node后端服务器能压缩文件流,那由web代理服务器可以压缩吗?
>
> 3.如果文件一开始就是压缩过的,是不是就能减轻消耗?
>
> 4.压缩数据流兼容性
>
> 5.用缓存代替传输?
>
> 6.文件服务器如何配置缓存何时过期?



----



### console控制台

#### 断言测试

console.assert(value[, ...message])

验证 `value` 是否为真。 如果不是，则记录 `Assertion failed`。 如果提供 `message`，则通过传入所有消息参数来使用 `util.format()` 格式化错误消息。 输出用作错误消息。

使用非真的断言调用 `console.assert()` 只会导致打印 `message` 到控制台而不会中断后续代码的执行。



#### 表格信息

console.table(tabularData[, properties])]

第二个参数通常为一个数组，表示表格标题栏的名称，通过调整数组元素值选择要显示的列。

```js
// 这些不能解析为表格数据。
console.table(Symbol());
// Symbol()

console.table(undefined);
// undefined

console.table([{ a: 1, b: 'Y' }, { a: 'Z', b: 2 }]);
// ┌─────────┬─────┬─────┐
// │ (index) │  a  │  b  │
// ├─────────┼─────┼─────┤
// │    0    │  1  │ 'Y' │
// │    1    │ 'Z' │  2  │
// └─────────┴─────┴─────┘

console.table([{ a: 1, b: 'Y' }, { a: 'Z', b: 2 }], ['a']);
// ┌─────────┬─────┐
// │ (index) │  a  │
// ├─────────┼─────┤
// │    0    │  1  │
// │    1    │ 'Z' │
// └─────────┴─────┘
```



----



### assert断言

断言模块的api通常会阻止后续代码的运行





----



### util工具支持

#### callback风格转换promise

util.promisify()

针对传入error-first回调作为函数的最后一个参数的函数（比如fs.readFile('./filename', (err, data) => {})）, util提供了promisify(original)方法用来将这种类型的函数转换成返回promise的形式。

```js
const fs = require('fs');

fs.readFile('./h.js', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data.toString());
})

// 使用util.promisify转换后
const fs = require('fs');
const util = require('util');
const readFilePromise = util.promisify(fs.readFile);
readFilePromise('./h.js')
  .then((data) => {
    console.log(data.toString());
  }, (err) => {
    console.error(err);
  });
```



---



## 第三方模块

### fs-extra

### Express

### Morgan日志

### Mongoose

...



