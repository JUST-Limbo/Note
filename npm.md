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

+ npm  i xx  --save-exact
  + 安装一个第三方包，将一个确定的依赖版本写死在package.json中

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

  version字段结构为：'0.0.0-0'，分别代表：大号.中号.小号-预发布号，对应major.minor.patch-prerelease

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
pnpm config set registry https://registry.npmmirror.com
```

切回原镜像

```bash
npm config set registry https://registry.npmjs.org
```

查看当前设置

```bash
npm config list
yarn config list
```

获取当前设置的镜像地址

```bash
npm config get registry
yarn config get registry
pnpm config get registry
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

## .npmrc

```bash
registry=https://registry.npmmirror.com #指定特定的 registry 来获取依赖
```



## yarn 安装依赖 报 error Error: certificate has expired

删除yarn.lock后再试
