# gulp

全局依赖gulp

+ 一台电脑安装一次
+ 提供命令行能力

项目根目录准备一个`gulpfile.js`的文件

+ gulp进行打包的依据
+ 每个项目需要一个`gulpfile.js`
+ 在这个文件里进行本项目的打包配置
+ gulp在运行时会自动读取`gulpfile.js`文件里的配置
+ 按照在`gulpfile.js`文件里的配置进行打包工作
+ 直接卸载项目根目录，和`src`同级

项目中安装`gulp`开发依赖

+ 用于提供配置打包流程的API
+ 每一个项目都要安装一次

**命令行输入`gulp`会执行`default`事件**

## API

### gulp.task()

创建一个基于流的任务

如果需要捕获该任务的结束，需要将这个流return出去

```js
gulp.task(任务名称,任务处理函数)
```

### gulp.src()

找到源文件

```js
gulp.src(路径,任务处理函数)
gulp.src('./a/b,html') // 找到指定一个文件
gulp.src('./a/*.html') // 找到指定目录下指定后缀的文件
gulp.src('./a/**') gulp.src('./a/*.*')  // 找到指定目录下所有文件
gulp.src('./a/**/*') // 找到指定目录下所有子目录里的所有文件
gulp.src('./a/**/*.html') // 找到制定目录下所有子目录里所有指定后缀的文件
```



### gulp.dest()

将接收到的内容放入指定目录内

```js
gulp.dest()
```



### gulp.watch()

监控指定目录下的文件改动

```js
gulp.watch(路径信息,任务处理函数)
```



### gulp.series()

逐个执行多个任务

```js
gulp.series(任务1,任务2,任务3,...)
```



### gulp.parallel()

并行开始多个任务

```js
gulp.parallel(任务1,任务2,任务3,...)
/**
 * 配置一个默认任务
 * gulp.series() gulp.parallel()
 * 这两个api的返回值是一个函数,返回值可以直接被当做任务函数使用
 */
```





### pipe()

管道函数，接收当前流，进入下一个流过程

```js
gulp.src().pipe(压缩任务).pipe(转码).pepe(gulp.dest('abc'))
```



## 插件

### gulp-cssmin

导入后得到一个处理流文件的函数

直接在管道函数里执行就好了



### gulp-autoprefixer

导入后得到一个处理流文件的函数

用于css兼容性

直接在管道函数里执行，需要传递参数

可以在`package.json`通过童扬的配置项替代

```js
gulp.pipe(autoPrefixer({
    browsers:[要兼容的浏览器]
}))
```



### gulp-sass

变量和混合器可以定义在`.sass`文件中

gulp配置只会转码`.scss`

设置的变量和混合器文件不会被转码

但是当转码`.scss`文件时会自动读取`.sass`文件里的变量，并解析使用





### gulp-uglify

js文件压缩

**~~不能写ES6语法，否则报错~~**



### gulp-babel

ES6 => ES5

gulp-babel的版本

+ gulp-babel@7：多使用在gulp@3
+ gulp-babel@8：多使用在gulp@4

gulp-babel需要手动安装两个依赖

+ @babel/core
+ @babel/preset-env

```js
.pipe(babel({
      presets: ['@babel/env']
    }))
```



### gulp-htmlmin

```js
.pipe(htmlmin({ // 通过配置的参数进行压缩
      // collapseWhitespace: true,  // 移除空格
      // removeEmptyAttributes: true, // 移除空属性
      collapseBooleanAttributes: true, // 移除布尔值属性的属性值
      removeAttributeQuotes: true, // 移除单属性值上的引号
      minifyCSS: true, // 压缩在style标签内的样式代码(只能压缩一行不能解决兼容性)
      minifyJS: true,  // 压缩script标签内的js代码
      removeStyleLinkTypeAttributes: true, // 移除style和link标签上的type属性(text/css)
      removeScriptTypeAttributes: true // 移除script标签上的type属性(text/css)
    }))
```



### gulp-imagemin



### gulp-concat



### gulp-webserver

启动一个基于node书写的服务器

```js
gulp
    .src('./dist')
    .pipe(webserver({
      host: 'localhost', // 域名(可以配置自定义域名)
      port: '8080',
      livereload: true, // 当文件修改时是否自动刷新页面
      open: './pages/index.html', // 默认打开哪个文件,从dist目录以后的路径开始书写
      proxies:[ // 配置所有代理 对象数组 只是针对gulp-webserver服务器启动的代理
        {
          source:'', // 代理标识符
          target:'' // 代理目标地址
        }
      ]
    }))
启动服务配置自定义域名
host填自定义域名
找到电脑的hosts文件
添加一行 127.0.0.1 自定义域名
```



### gulp-file-include

在一个html页面里导入另一个html片段

导入后可以得到一个处理流文件函数，在管道函数中调用即可，需传递参数

```js
function htmlHandler() {
  return gulp
    .src('./src/pages/*.html')
    .pipe(fileInclude({ // 根据配置导入对应的html片段
      prefix:'@_@', // 自定义的标识符
      basepath:'./src/components' // 基准目录 组件文件所在目录
    }))
    .pipe(htmlmin({ // 通过配置的参数进行压缩
      // collapseWhitespace: true,  // 移除空格
      // removeEmptyAttributes: true, // 移除空属性
      collapseBooleanAttributes: true, // 移除布尔值属性的属性值
      removeAttributeQuotes: true, // 移除单属性值上的引号
      minifyCSS: true, // 压缩在style标签内的样式代码(只能压缩一行不能解决兼容性)
      minifyJS: true,  // 压缩script标签内的js代码
      removeStyleLinkTypeAttributes: true, // 移除style和link标签上的type属性(text/css)
      removeScriptTypeAttributes: true // 移除script标签上的type属性(text/css)
    }))
    .pipe(gulp.dest('./dist/pages/'))
}
```

导入语法：

```html
<body>
<!-- 导入组件的使用 -->
<!-- 自定义标识符include('要导入的文件路径')  -->
<!-- 文件路径从basepath标识符以后开始书写 -->
@_@include('./footer.html')
</body>
也可以导入head标签内的模板
```

组件传参：

```html
<!-- 在导入时传递第二个参数,一个JSON格式对象 -->
@_@include('./footer.html',{title:'asb'})

<div>footer</div>
<h1>@_@title</h1>

```

## 删除

### del

npm i -d del

删除文件目录
