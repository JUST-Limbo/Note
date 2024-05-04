## http和https



## http缓存

### 强缓存和协商缓存

强缓存：浏览器不会像服务器发送任何请求，直接从本地缓存中读取文件并返回Status Code: 200 OK

![img](assets/http.assets/16a8bdbc4b9c8720~tplv-t2oaga2asx-watermark.awebp)

> 200 form memory cache : 不访问服务器，一般已经加载过该资源且缓存在了内存当中，直接从内存中读取缓存。浏览器关闭后，数据将不存在（资源被释放掉了），再次打开相同的页面时，不会出现from memory cache。

> 200 from disk cache： 不访问服务器，已经在之前的某个时间加载过该资源，直接从硬盘中读取缓存，关闭浏览器后，数据依然存在，此资源不会随着该页面的关闭而释放掉下次打开仍然会是from disk cache。

> 优先访问memory cache,其次是disk cache，最后是请求网络资源

协商缓存: 向服务器发送请求，服务器会根据这个请求的request header的一些参数来判断是否命中协商缓存，如果命中，则返回304状态码并带上新的response header通知浏览器从缓存中读取资源

![img](assets/http.assets/16a8bc3172e3a167~tplv-t2oaga2asx-watermark.awebp)

两类缓存规则可以同时存在，强制缓存优先级高于协商缓存，也就是说，当执行强制缓存的规则时，如果缓存生效，直接使用缓存，不再执行协商缓存规则。



### expires

服务器和浏览器以GMT格式标准时间约定文件过期时间，用expires字段控制。下次请求时，请求时间小于服务端返回的到期时间则直接使用缓存（没有走到服务端）。

缺点：

1. 缓存过期后，不论目标文件是否产生过变化，都会再次读取目标文件并返回到浏览器
2. 服务器和浏览器时间可能不同步，缓存使用不精准

### Cache-Control

| 字段值   | 作用                                                         |
| -------- | ------------------------------------------------------------ |
| no-cache | 防止从缓存中返回过期的资源，所以使用之前，需要和源服务器发起请求比对过期时间 |
| no-store | 这个指令才是真正的不进行缓存，暗示请求报文中可能含有机密信息，不可缓存 |
| max-age  | 在指定时间内（单位秒），缓存服务器不再对资源的有效性进行确认，可以使用 |
| private  | 只有某个在通过缓存服务器的时候，得到缓存资源                 |
| public   | 所有的用户在通过缓存服务器的时候，都可以缓存这个资源。       |

针对浏览器和服务器时间不同步，加入了新的缓存方案；这次服务器不是直接告诉浏览器过期时间，而是告诉一个相对时间`max-age=10`，意思是10秒内，直接使用浏览器缓存。

![cache-control](assets/http.assets/16531214de157f88~tplv-t2oaga2asx-watermark.awebp)

### Last-Modified / If-Modified-Since

服务器比较请求头中的`If-Modified-Since `，如果一致则给出304状态码，不返回目标文件；如果不一致，则返回目标文件并告知浏览器目标文件最新的`Last-Modified`

缺点：

1. Last-Modified 过期时间只能精确到秒。无法应对同一秒内文件密集更新的情况
2. Last-Modified只匹配时间，不匹配文件内容。无法应对目标文件实际被覆盖然而内容前后未发生改变的情况

### Etag / If-None-Match

应对文件内容不变的情况，在服务器引入Etag响应头，

![img](assets/http.assets/16a8c60fb0ef49f0~tplv-t2oaga2asx-watermark.awebp)

## Cookie

每个域名下的cookie 的大小最大为4KB

| 属性名   | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| name     | 名称，创建后不能更改；必填                                   |
| value    | 值；必填                                                     |
| maxAge   | 失效时间，单位秒，，默认-1，负数表示当前为临时Cookie关闭浏览器即失效，0表示删除该Cookie |
| secure   | 默认false，该字段不是键值对的形式，如果要指定该字段，只要在设置cookie时添加secure字符即可。设置了该字段即表示只有使用SSL链接时Cookie才会发送到浏览器。 |
| path     | Cookie的使用路径，通过这个字段可以为服务器上特定的文档分配cookie。默认值是设置 Cookie 时的当前目录。如果设置为“/sessionWeb/”，则只有contextPath为“/sessionWeb”的程序可以访问该Cookie。如果设置为“/”，则本域名下contextPath都可以访问该Cookie。注意最后一个字符必须为“/”。 |
| HttpOnly | 只能由服务端设置。用来控制Cookie是否能通过JS（`document.cookie`）访问，默认为空表示可以访问 |
| domain   | 可以访问该Cookie的域名，所有向该域名发送的请求中都会包含这个cookie信息。如果设置为“.google.com”，则所有以“google.com”结尾的域名都可以访问该Cookie。注意第一个字符必须为“.”。 |

use example：

```js
document.cookie = "username=Darren;path=/;domain=.csdn.net"
```

### CORS中的cookie

CORS请求默认不发送Cookie和HTTP认证信息。如果要把Cookie发到服务器，一方面要服务器同意，指定`Access-Control-Allow-Credentials`字段。（via[跨域资源共享 CORS 详解 - 阮一峰的网络日志 (ruanyifeng.com)](http://www.ruanyifeng.com/blog/2016/04/cors.html)）

```http
Access-Control-Allow-Credentials: true
```

另一方面，开发者必须在AJAX请求中打开`withCredentials`属性。

```js
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
```

如果要发送Cookie，`Access-Control-Allow-Origin`就不能设为星号，必须指定明确的、与请求网页一致的域名。

参考链接：

[cookie的domain属性_cookie domain_545龙哥哥的博客-CSDN博客](https://blog.csdn.net/longgege001/article/details/81274088)

[关于Cookie的知识的总结 - Fogwind - 博客园 (cnblogs.com)](https://www.cnblogs.com/fogwind/p/6890159.html)

## 状态码

301状态码表示永久移动，让客户端请求的资源在未来指向新的URL，且为了避免搜索引擎等数据错误，应该使用301来告知浏览器直接自动访问新URL。一个常见的例子就是网站的 HTTPS 化，服务器接收到 HTTP 请求后会发出301回应，告诉浏览器将页面跳转到HTTPS协议上。

302状态码表示临时移动或者重定向，但后续请求依旧会去请求老的url。
