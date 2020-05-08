# morgan

`Express`默认的日志中间件，也可以脱离express，作为node.js的日志组件单独使用。

安装:

```npm
npm install express morgan
```



案例

```js
var express = require('express');
var app = express();
var morgan = require('morgan');

app.use(morgan('short'));
app.use(function(req, res, next){
    res.send('ok');
});

app.listen(3000);
```

打印日志

```js
::1 - GET / HTTP/1.1 304 - - 3.927 ms
::1 - GET /favicon.ico HTTP/1.1 304 - - 0.310 ms
::1 - GET /12312 HTTP/1.1 200 2 - 1.235 ms
::1 - GET /favicon.ico HTTP/1.1 304 - - 0.216 ms
```



## 将日志打印到文件中

```js
var express = require('express');
var app = express();
var morgan = require('morgan');
var fs = require('fs');
var path = require('path');

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'record.log'), {flags: 'a'});

app.use(morgan('short', {stream: accessLogStream}));
app.use(function(req, res, next){
    res.send('response from node');
});

app.listen(3000);
```



## API

`morgan([format][, options])`

+ format <string>可选，用于设置日志格式，默认值是`default`。`morgan`预定义了以下几种日志格式

  详细特征参见[官方文档](https://github.com/expressjs/morgan#predefined-formats)

  + combined
  + common
  + dev
  + short
  + tiny

+ options <object> 可选，配置项。该对象有以下几个属性

  + stream  日志的输出流配置
  + skip  过滤函数
  + immediate <boolean>默认为`false`，如果为`true`，收到请求就记录日志