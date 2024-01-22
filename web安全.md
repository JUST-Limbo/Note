## CSRF

Cross Site Request Forgery

是一种冒充受信任用户，**向服务器发送非预期请求**的攻击方式。（并不一定要进入页面，而是直接从来浏览器地址栏发起get请求）

 防御方式：

+ 验证码
+ 尽量post（不能完全防住）
+ 验证referer
+ Anti CSRF Token

> referer首部，如果通过浏览器发起的请求，是无法伪造的，referer首部是禁止修改首部，浏览器自动设置的，通过js代码设置无效

## xss攻击

指攻击者通过注入恶意HTML、JS脚本到网页中，当用户浏览网页时执行恶意代码，从而实施攻击的过程。

产生原因：

1. 浏览器具有解析和执行js脚本的能力，但是并不能判断代码是否恶意
2. 输入和输出时缺少必要的安全策略，导致恶意代码执行

分类：

**反射性XSS**：攻击者构造特制的恶意链接，诱使用户点击该链接来触发漏洞，当服务器返回的响应（HTML文档）中包含恶意脚本时，恶意代码将在用户浏览器中执行。

```js
https://example.com/search?keyword=<script>alert('XSS Attack');</script>
```

**存储型**：攻击者将恶意脚本代码存储到目标网站的数据库中，当其他用户浏览该网站时，恶意脚本会从数据库中被读取并执行。

利用留言板的存储功能，发布了一条包含恶意脚本的留言，如下所示：

```js
<script>alert('Stored XSS Attack');</script>
```

留言存储在数据库中的记录可能类似于：

```js
Username: John
Message: Hello, everyone! <script>alert('Stored XSS Attack');</script>
```

当其他用户访问留言板时，网站会从数据库中读取并显示留言，恶意脚本也会被读取并在用户的浏览器中执行。这就导致在其他用户的浏览器中弹出一个警示框，其中包含"Stored XSS Attack"的提示信息。

> HTML5中指定不执行由innerHTML插入的script标签，但是仍然可以通过其他方式执行js

```html
<img src="null" onerror="alert('xss')"/>
```

**DOM型XSS**

由`document.write` `eval`等处理才产生的XSS

**基于DOM属性的XSS**

```html
<img src="javascript:alert('xss')" />
```

[XSS常见的触发标签_可以触发xss的标签_H3rmesk1t的博客-CSDN博客](https://blog.csdn.net/LYJ20010728/article/details/116462782?ops_request_misc=&request_id=0a77edb6be9c46b9af3a6ef6dfb0c74b&biz_id=&utm_medium=distribute.pc_search_result.none-task-blog-2~blog~koosearch~default-1-116462782-null-null.268^v1^control&utm_term=xss&spm=1018.2226.3001.4450)



预防：

cookie：httponly

参数校验

避免使用eval

对返回值使用.text方式而不是.html方式

