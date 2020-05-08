### 准备工作

与之前一样，新建工程目录并将下面内容复制到 *package.json* 中：

```
{
    "name": "static-file-fun", 
    "private": true, 
    "scripts": {
        "start": "node app.js" 
    }
}复制代码
```

接下来，我们执行 *npm install express --save* 安装最新版 Express 。确保安装完成后，我们在工程目录里新建文件夹 *static*  并在其中存放一些文件。最后，我们新建工程主入口文件 *app.js* 。一切就绪后，工程的大致目录如下：



![04_05](https://user-gold-cdn.xitu.io/2017/9/16/8cdfa436f3c47a9947e4ff330e5df7b3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



另外，值的一提的是之所以配置 *npm start* 命令，既是因为开发约定更重要的是让其他人开箱即用无需自己手动查找程序入口。

