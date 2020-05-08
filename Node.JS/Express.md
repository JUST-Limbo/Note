# Express 

基于 Node.js 平台的 web 应用开发框架 



req.app



## Hello World

```js
// 0. 加载 Express
const express = require('express')

// 1. 调用 express() 得到一个 app
//    类似于 http.createServer()
const app = express()

// 2. 设置请求对应的处理函数
//    当客户端以 GET 方法请求 / 的时候就会调用第二个参数：请求处理函数
app.get('/', (req, res) => {
  res.send('hello world')
})

// 3. 监听端口号，启动 Web 服务
app.listen(3000, () => console.log('app listening on port 3000!'))
```





## set方法

`app.set("key":"value")`

指定变量的值或通过配置一些特殊的变量来配置服务器行为。

常见于指定模板引擎页面目录、配置服务器端口号等场景。

与`app.get("key")`联合使用





## 路由

用URL定位资源，用HTTP描述操作。



`路由`用于确定应用程序如何响应对特定端点的客户机请求，包含一个` URI`（或路径）和一个特定的` HTTP 请求方法`（GET、POST 等）。

每个路由可以具有一个或多个处理程序函数，这些函数在路由匹配时执行。

路由定义采用以下结构：

```javascript
app.METHOD(PATH, HANDLER)
```

- `app` 是 `express` 的实例。
- `METHOD` 是 [HTTP 请求方法](http://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)。
- `PATH` 是服务器上的路径（**支持正则**）
- `HANDLER` 是在路由匹配时执行的函数。

### 示例

```js
// 句柄
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/', function (req, res) {
  res.send('Got a POST request');
});

app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});

//	无论是使用GET，POST，PUT，DELETE还是http模块支持的任何其他HTTP请求方法
//  都会对路由“ /secret” 的请求执行以下处理程序。
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...')
  next() // pass control to the next handler
})
```

> 注意区分`路由`和`路由级中间件`的区别

| 成员方法       | 说明                                                     |
| :------------- | -------------------------------------------------------- |
| res.write()    | 来自Node核心                                             |
| res.end()      | 来自Node核心                                             |
| res.send()     | 支持Buffer、String、Array                                |
| res.json()     | JSON数据响应                                             |
| res.render()   | 通常和模板引擎搭配使用，常见于前后端不分离的工程         |
| res.redirect() | 默认将statusCode设为`302`，常见于前后端不分离的工程      |
| res.status()   | 设置响应的HTTP状态，通常用于`错误处理中间件`支持链式调用 |
| res.sendFile() | 响应文件                                                 |





### get请求的传参

#### 查询字符串传参

```js
# /user?uid=10&loc=bj
app.get("/user",(req,res)=>{
//express为每req对象添加属性query属性
	console.log(req.query.uid);
	console.log(req.query.loc);
});
```

#### 动态的路径参数

请求路径中参数值会被捕获并填充到req.params中，而路由中对应的参数名被设置为对应的键名。

```js
#Route path: /users/:userId/books/:bookId
#Request URL: http://localhost:3000/users/34/books/8989
#req.params: { "userId": "34", "bookId": "8989" }
app.get('/users/:userId/books/:bookId', function (req, res) {
  res.send(req.params)
})
```



### 单路由多回调

#### 多个回调函数处理路由

```js
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from B!')
})
```

#### 回调函数数组处理路由

```js
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

var cb2 = function (req, res) {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])
```

> 请注意上面的案例中的`next()`，调用此函数将调用应用程序中的下一个中间件函数，但并不会中止后续代码的执行。`res.end() res.send()`也不会中止代码执行

#### 组合处理

```js
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from D!')
})
```



### 链式路由

`app.route()`返回单个路由的实例。通常用来简化路由结构，减少重复代码量。

```js
app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })
```





## 中间件

将请求和响应的处理过程进行拆分，使用多个函数共同构成一个完整的处理流水线。

`app.use()`和`app.METHOD()`是express注册中间件的方法，它返回一个函数。

> 中间件主要用于执行以下任务：
>
> 1. 执行任何代码
> 2. 更改请求、响应对象
> 3. 结束请求-响应周期
> 4. 调用堆栈中的下个中间件



```js
var express = require('express')
var app = express()

var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next()
}

app.use(myLogger)

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000)
// 中间件的加载顺序很重要：首先加载的中间件功能也将首先执行。
// 如果myLogger在到根路径的路由之后加载，则请求永远不会到达请求，并且应用程序不会打印“ LOGGED”，因为本案例中根路径的路由处理程序会终止请求-响应周期。
```

### 如何封装中间件

```js
var mw = require('./middleware.js')
app.use(mw({ option1: '1', option2: '2' }))


#middleware.js
module.exports = function (options) {
  return function (req, res, next) {
    // Implement the middleware function based on the options object
    next()
  }
}
```



如果当前的中间件功能没有结束请求-响应周期，则必须调用`next()`将控制权传递给下一个中间件功能。否则，该请求将被挂起。如果`next()`传递除`'route'`字符串外其他参数，则代表抛出一个错误，参数为错误文本。

> `next()`的作用：
>
> 1. 转移控制权
> 2. 抛出错误
>
> `next('route')`作用是`跳过当前路由分组中，剩余的handler（中间件）`，将控制权传递给下一条路由。
>
> `next('route')` 仅适用于使用`app.METHOD( ) `或 `router.METHOD( )`

+ 应用级中间件
+ 路由级中间件
+ 错误处理中间件
+ 内置中间件
+ 第三方中间件



### 应用级中间件

没有安装路径的中间件功能。每次应用收到请求时，都会执行该功能。

```js
var app = express()
app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})
```

/user/:id路径上安装的中间件功能。该函数针对/user/:id路径上的任何类型的HTTP请求执行。

```js
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})
```

处理对/user/:id路径的GET请求。

```js
app.get('/user/:id', function (req, res, next) {
  res.send('USER')
})
```

中间件堆栈，一个路径多个路由

```js
app.use('/user/:id', function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}, function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})
```



```js
app.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id)
  next()
}, function (req, res, next) {
  res.send('User Info')
})

// handler for the /user/:id path, which prints the user ID
app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id)
})
```

**next('route')与next()的区别**

```javascript
app.get('/user/:id', function (req, res, next) {
  // 条件成立,跳到下一条路由
  if (req.params.id === '0') next('route')
  //条件不成立,跳到下一个中间件函数
  else next()
}, function (req, res, next) {
  // send a regular response
  res.send('regular')
})

// 兜底
app.get('/user/:id', function (req, res, next) {
  res.send('special')
})
```

中间件可以在数组中声明，以达到重用的效果

```js
function logOriginalUrl (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}

function logMethod (req, res, next) {
  console.log('Request Type:', req.method)
  next()
}

var logStuff = [logOriginalUrl, logMethod]
app.get('/user/:id', logStuff, function (req, res, next) {
  res.send('User Info')
})
```



### 路由级中间件

使用`router.use()`和`router.METHOD()`将中间件绑定到`express.Router()`的实例中。

```javascript
var app = express()
var router = express.Router()

// 通用路由中间件
router.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})

// 匹配以 ’/user/:id‘ 开头的路径
router.use('/user/:id', function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}, function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})

// 匹配以 ‘/user/:id' 开头路径的get请求
router.get('/user/:id', function (req, res, next) {
  // next('route')
  if (req.params.id === '0') next('route')
  // next()
  else next()
}, function (req, res, next) {
  res.render('regular')
})

// 兜底
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id)
  res.render('special')
})

// 将路由绑定到app上 可以将router单独封装在一个js文件中,然后将router对象暴露出去
app.use('/', router)
```

#### 路由分发

将路由器用于特定的根URL，以此种方式将路由进行分配，提高可读性

```js
app.use('/calendar', router)
```



#### 全匹配

`router.all(path, [callback, ...] callback)`

通常用于身份验证等全局行为

```js
router.all('*',cb0,cb1)
// 上下等效
router.all('*',cb0)
router.all('*',cb1)

// 白名单
router.all('/api/*',cb2)
```



#### 链式路由

`router.route()`返回单个路由的实例。通常用来简化路由结构，减少重复代码量。

```js
var router = express.Router()

router.param('user_id', function (req, res, next, id) {
  // sample user, would actually fetch from DB, etc...
  req.user = {
    id: id,
    name: 'TJ'
  }
  next()
})

router.route('/users/:user_id')
  .all(function (req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    next()
  })
  .get(function (req, res, next) {
    res.json(req.user)
  })
  .put(function (req, res, next) {
    // just an example of maybe updating the user
    req.user.name = req.params.name
    // save user ... etc
    res.json(req.user)
  })
  .post(function (req, res, next) {
    next(new Error('not implemented'))
  })
  .delete(function (req, res, next) {
    next(new Error('not implemented'))
  })
```





### 错误处理中间件

Express带有默认的错误处理程序，因此无需自己编写即可开始使用。

确保Express能够捕获运行路由处理程序和中间件时发生的所有错误，这一点很重要。

出于组织（和更高级别的框架）的目的，可以定义多个错误处理中间件功能，就像使用常规中间件功能一样。例如，为使用`XHR`和不使用的请求定义错误处理程序。

> 中间件必须采用**四个**参数以将其标识为错误处理中间件，即使不需要使用`next`对象。
>
> 否则会被解析为常规中间件。

```js
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})
```

#### 同步代码中发生的错误

```js
// 无需进行额外工作,自动捕获并处理
app.get('/', function (req, res) {
  throw new Error('BROKEN') // Express will catch this on its own.
})
```

#### 中间件/调用异步函数返回的错误

```js
// 将错误传递给next()
app.get('/', function (req, res, next) {
  fs.readFile('/file-does-not-exist', function (err, data) {
    if (err) {
      next(err) // Pass errors to Express.
    } else {
      res.send(data)
    }
  })
})
```





### 内置中间件

`express.static(root, [options])`

将静态文件目录托管到指定路径下







### 第三方中间件

#### morgan

#### log4js

#### debug

#### body-parser

#### express-session

#### express-jwt

#### jwt

#### connect-ratelimit

#### 跨域

### http-errors

### http-asserts