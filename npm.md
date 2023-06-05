# npm

## 命令

- npm init
  - npm init -y 跳过向导 快速生成
- npm install
- npm install 包名

  - 只下载
  - npm i
- npm install --save 包名

  - 下载并保存依赖项

  - npm i -S 包名
- npm uninstall 包名
  - 只删除,如果有依赖项会依然保存
  - npm un 包名
- npm uninstall --save 包名
  -	删除的同时去除依赖信息
  -	npm un -S 包名
- npm help
  -	查看使用帮助
- npm 命令 -help
  + 查看指定命令的使用帮助

+ npm update packageName
  + 更新指定依赖安装包

+ npm create xxx
  +  按照模板创建项目，**是npm init xxx的别名**

+ npm version 

  version字段结构为：'0.0.0-0'，分别代表：大号.中号.小号-预发布号，对应majon.minor.patch-prerelease

  [npm version 常用命令_文摘资讯的博客-CSDN博客](https://blog.csdn.net/gtLBTNq9mr3/article/details/125252366)

  [git自动生成changelog及项目版本管理 - 掘金 (juejin.cn)](https://juejin.cn/post/6844904147892830221)

清除npm缓存

```bash
npm cache clean --force
```

npm淘宝镜像地址

```bash
https://registry.npmmirror.com

npm config set registry https://registry.npmmirror.com
yarn config set registry https://registry.npmmirror.com
```

node-sass淘宝镜像地址

```bash
https://npmmirror.com/mirrors/node-sass/ 

npm config set sass_binary_site=https://npmmirror.com/mirrors/node-sass/ 
yarn config set sass_binary_site=https://npmmirror.com/mirrors/node-sass/ 
```

## JS读取当前运行的脚本名称

由npm提供的变量，返回当前所运行脚本的名称，如`build`等（via [npm scripts 使用指南 - 阮一峰的网络日志 (ruanyifeng.com)](https://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)）

```js
const TARGET = process.env.npm_lifecycle_event;
```

## node与node-sass版本对应关系

[node-sass - npm (npmjs.com)](https://www.npmjs.com/package/node-sass)





