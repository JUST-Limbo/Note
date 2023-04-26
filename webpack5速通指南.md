技术文章，尤其是前端工具类技术文章具有时效性。因此，如文中所提到内容与官方文档存在差异，应以官方文档为准，请读者知悉。

## 摘要

本文是 webpack5 集成vue2、TypeScript、ESLint的配置文章，并给出一套完整的配置案例。

 webpack5 已于2020-10-10发布，但是在最近学习 webpack5 的过程中发现，很多 webpack5 的文章在描述知识点时，给出的代码案例仍然使用一些 webpack4 的旧解决方案，比如`eslint-loader`、`cache-loader`、`url-loader`等，当查阅这些方案的文档和代码仓库时，都标注了**deprecated for v5**，这给我造成了很大困扰。

最初，我只是想整理一下 webpack5 容易遗忘的知识点，记录旧项目升级 webpack5 过程中的一些注意事项，但是内容越写越多，决定索性整理出一篇文章。

本文的写作目标是尽量使用新的解决方案去描述 webpack5 配置（注意本文发表时期是2022年年中），同时为后来的人指出新的 webpack5 周边在使用上可能遇到的一些问题。

本文的难度为入门级，不涉及深入的 webpack 实现细节，旨在帮助其他人快速入门，并在**文末附录中提供一个集成 vue2 的 webpack5 完整配置案例以供参考**。

<font size=5>**可以跳过正文直接去看附录的方案。**</font>

## 安装

初始化npm

```bash
npm init -y
```

安装webpack webpack-cli

```bash
npm i webpack@5 webpack-cli@4 –D # 局部安装
```

## webpack命令

### 在命令行中直接使用webpack命令

如果全局下未安装webpack、webpack-cli，则需要在**项目根目录**命令行执行以下 npx 命令

+ 使用指定配置文件

  ```bash
  npx webpack --config webpack.config.js --mode development
  # “--config webpack.config.js” 可以不写,默认就是它
  npx webpack
  ```

+ 不使用配置文件

  ```bash
  npx webpack --entry ./src/main.js --output-path /build --mode development
  ```

### 在package.json中配置webpack命令

```json
{
  ...,
  "scripts": {
    "dev": "webpack serve --config build/webpack.dev.js",
    "build": "webpack  --config build/webpack.prod.js",
  },
  ...
}
```

你可以使用 `--node-env` 选项来设置 `process.env.NODE_ENV`

[命令行接口（CLI） | webpack 中文文档 (docschina.org)](https://webpack.docschina.org/api/cli/#node-env)

### 如何快速创建一个webpack项目

[配置 | webpack 中文文档 (docschina.org)](https://webpack.docschina.org/configuration/#set-up-a-new-webpack-project)

[命令行接口（CLI） | webpack 中文文档 (docschina.org)](https://webpack.docschina.org/api/cli/#init)

## 配置

### mode

可选值 `development`  `production`  `none`

默认值 `production`

```javascript
// webpack.dev.config.js
module.exports = {
  mode: 'development',
};
```

webpack会根据mode的值启动对应的内置优化，比如会在`development`模式下开启`source-map`，会在`production`下开启代码混淆和压缩。

> 关于不同`mode`值对应模式的内置优化有哪些？ v5 的文档似乎将这部分内容略去了，如果想要了解可以参考 v4 的文档 [mode v4](https://v4.webpack.docschina.org/concepts/mode/)，两版本关于内置优化的思路上的差异应该不是特别大。

### stats

这个配置是用来控制编译时终端中的 bundle 信息显示的，通常情况下使用`errors-only`这个值。

```js
module.exports = {
  stats: 'errors-only',
};
```

需要明确的是，它只能配置 bundle 编译打包相关的信息，无法控制其他插件的终端输出信息。比如它无法控制  TypeScript 类型检查的错误/警告信息（由 `fork-ts-checker-webpack-plugin` 控制）或者 ESLint 格式检查的错误/警告信息（由 `eslint-webpack-plugin` 控制）。

| 预设                | 可选值  | 描述                                              |
| :------------------ | :------ | :------------------------------------------------ |
| `'errors-only'`     | *none*  | 只在发生错误时输出                                |
| `'errors-warnings'` | *none*  | 只在发生错误或有新的编译时输出                    |
| `'minimal'`         | *none*  | 只在发生错误或新的编译开始时输出                  |
| `'none'`            | `false` | 没有输出                                          |
| `'normal'`          | `true`  | 标准输出                                          |
| `'verbose'`         | *none*  | 全部输出                                          |
| `'detailed'`        | *none*  | 全部输出除了 `chunkModules` 和 `chunkRootModules` |
| `'summary'`         | *none*  | 输出 webpack 版本，以及警告数和错误数             |

上述不同[预设值](https://webpack.docschina.org/configuration/stats/#stats-presets)对应不同内置统计信息配置，你也可以给 `stas` 传入[Stats 对象 ](https://webpack.docschina.org/configuration/stats/#stats)进行自定义配置。

### devtool

控制 `source map` 的生成和输出格式

 `source map` 是一个对开发人员调试很有用的功能。当你浏览器中实际运行的代码不同于开发代码时（经过 babel 等工具转化或混淆），借助 `source map` 可以让 JS 解释器告诉你某一处报错/输出在开发代码中对应的位置，还可以直接显示原始代码而不是转换后的代码。这给开发人员的 debug 调试工作带来很大便捷。

> 启用 `source map` 还需要浏览器配置，通常情况下默认启用，如未启用，请自行通过搜索引擎查找 如何开启浏览器的 `source map` 功能 。

```js
module.exports = {
  devtool: 'cheap-module-source-map',
};
```

 `devtool` 的可选值特别多，具体参见 [Devtool](https://webpack.docschina.org/configuration/devtool/)

开发模式下建议使用

| cheap-module-source-map                                      | eval-cheap-source-map                                        |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| 不生成列映射，仅生成行映射；<br />针对babel-loader等源自 loader 的 source map 会有更好的优化，这里的意思是说会显示 babel-loader 等转换之前的代码；<br />优点是代码 debug 直观，并且行映射足够用于定位问题；缺点是构建速度和二次构建速度都慢 | 构建速度快，有行映射，仅显示转换后的代码（转换后的代码也还好，没有到完全看不了的地步） |

生产模式下建议直接使用 `none`

> 关于 `devtool` 几个可选值的构建速度对比，我觉得 v4 的文档[devtool v4](https://v4.webpack.docschina.org/configuration/devtool/)描述的比 v5 的文档 [devtool v5](https://webpack.docschina.org/configuration/devtool/)直观一些。

### context

该配置项在配置 webpack 的过程中通常会以省略的形式来使用其默认值，实际上还挺重要的。

他指的是基础目录，值通常是一个绝对路径，**默认使用 Node.js 进程的当前工作目录**，用来解析入口起点的路径（如果入口起点的值传入的是相对路径）。

```js
// 想要获取 Node.js 进程的当前工作目录吗？可以执行以下代码
const { cwd } = require('process');
console.log(`Current directory: ${cwd()}`);
```

这里的意思是说如果你的 webpack.config.xxx.js 文件中 `entry` 配置入口起点的路径传入一个相对路径，那么该相对路径应该是相对于 `context` 所指的路径，而不是相对于 webpack.config.xxx.js 文件所在的目录路径。

 `context` 不仅会影响 `entry` 配置项的相对路径指向，其他很多使用相对路径的配置项也会被 `context` 值影响，比如 `html-webpack-plugin `的 template 参数[jantimon/html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)

| Name           | Type       | Default |
| -------------- | ---------- | ------- |
| **`template`** | `{String}` | ``      |

以下代码是对上述内容的举例说明（注意代码中的注释）：

```js
// 目录结构如下
|-- project,
    |-- build,
    |   |-- home.js,
    |   |-- template.html,
    |   |-- webpack.config.dev.js,
    |-- src,
    |   |-- home.js,
    |-- template.html,
    |-- package.json,
```

```json
// package.json
{
  ...,
  "scripts": {
    "dev": "webpack serve --config build/webpack.dev.js",
    "build": "webpack  --config build/webpack.prod.js",
  },
  ...
}
```

```js
// webpack.config.dev.js
// 在G://code/project/ 路径终端中运行 npm run dev
// 此时,context 指向 G://code/project/
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  //...
  entry: {
    home: './src/home.js', // 会指向project/src/home.js 而不是project/build/home.js
  },
  plugins: [
   	//...
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "template.html", // 会指向project/template.html 而不是 project/build/template.html
      inject: true,
      chunks: ["home"],
    }),
	]
};

```



> **为什么 entry 配置入口起点的相对路径不能是相对于 webpack.config.xxx.js 文件所在目录？**
>
> 因为 webpack.config.xxx.js 所在目录是**难以预测**的。
> **假如**入口起点的相对路径是相对于 webpack.config.js 所在目录路径的，那么当开发者把原本处在项目根目录（/project）下的 webpack.config.dev.js 、 webpack.config.prod.js 、webpack.config.common.js 集中移动到另一个 build（/project/build）目录下，按照前面的假设，则文件中配置的相对路径将会失效，需要重新配置，这样的方案显然是不合理的。
>
> **需要强调的是，即便有 context 配置可以保证相对路径的确定性，仍然建议在 webpack 其他需要使用路径的配置中尽量显式使用绝对路径，以免造成混淆。**



### entry

传入的值通常是单个或多个路径对象，作为应用程序的打包入口起点（ HTML 页面会使用到这些起点打包出来的 bundle ），由入口点开始构建依赖图。

如果 `entry` 传入的值是一个路径字符串或字符串数组，这个 chunk 会被命名为 `main` ，如果传入一个对象，则每个属性的键名就是每个入口对应的 chunk 名（你可以理解为每个入口都有一个标识名称，本文会提到在 webpack 其他地方需要使用 chunk 名，比如在 `html-webpack-plugin` 中）

**单入口/单页面写法**

```javascript
// 简写
module.exports = {
  entry: './src/main.js',
};
// 上述简写方式等同于下述写法
module.exports = {
  entry: {
    main: './src/main.js',
  },
};
```

**多入口/多页面写法**

```js
module.exports = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js',
  },
};
```

### output

主要是用来配置 bundle 的输出目录，输出文件格式，生成前是否要清空输出目录等。

```javascript
module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'), // 需要一个绝对路径
    filename: "js/[name].[contenthash:6].bundle.js",
    chunkFilename: "js/chunk_[name]_[contenthash:6].js",
    clean: true, // 在生成文件之前清空 output.path 目录
  },
};
```

> 模板字符串的描述见 [Template Strings](https://webpack.docschina.org/configuration/output/#template-strings)

hash **[范围最大]** 是针对整个项目的,如果把整个项目当做是一个文件(为什么非要是单个的1.txt就这么好理解成是文件了?),那么这个项目文件的内容发生改变(文件删除添加,文件内容修改),都会导致整个项目的hash值发生改变.

chunkhash **[范围其次]** 是根据当前入口文件最终打包出来的js文件.output. 当前依赖链中,有任意文件变动,都会改变这个hash值.

而contenthash **[范围最小]** 就仅仅只是针对当前文件的内容

**注意：** 本地开发环境不要配置 `chunkhash` 或 `contenthash`，因为编译后文件只存在于内存中，没有实际的磁盘文件，也会与`热更新`功能冲突。

参考资料

https://www.jianshu.com/p/6d81adb31601

[webpack中的hash、chunkhash、contenthash - 简书 (jianshu.com)](https://www.jianshu.com/p/2e4e930afc3d)

### devServer

关闭devserver的日志输出

[webpack-dev-server/CHANGELOG.md at 80a96fd4a989972dc308d0356c68f71c5a2abfc6 · webpack/webpack-dev-server (github.com)](https://github.com/webpack/webpack-dev-server/blob/80a96fd4a989972dc308d0356c68f71c5a2abfc6/CHANGELOG.md#400-beta0-2020-11-27)

[其它选项 | webpack 中文文档 (docschina.org)](https://webpack.docschina.org/configuration/other-options/#level)

```bash
npm install webpack-dev-server@4 -D
```

提供一个本地web服务器，提供模块热替换（在不丢失程序页面数据的前提下更新部分内容），服务器代理等功能。

想要使用 devServer 除了修改配置文件，还需要通过使用 server 指令，你可以配置`package.json script`：

```bash
// package.json
{
	// ...
  "scripts": {
    "dev": "webpack serve --config webpack.dev.js"
  },
  // ...
}
```

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const portfinder = require("portfinder");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const webpackDevServer = require('webpack-dev-server')
const devWebpackConfig = {
  mode: 'development',
  entry: {
    home: './src/home/index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name]_bundle.js',
  },
  devServer: {
    hot: true, // 热模块替换特性
    compress: true, // gzip配置 如果只限于本机开发项目体积小建议置为false改善构建速度；如果在局域网内协同联调、路由器限速、项目过大的场景下，建议置为true
    host: "0.0.0.0", // 本地服务域名 支持ipv4 ipv6 如果想要被外部访问置为 '0.0.0.0'
    port: "9191", // 本地服务端口号
    open: false, // 本地服务器启动后自动打开浏览器并访问
    client: {
      overlay: false, // 如果有warning或error,在浏览器中显示全屏遮罩
    },
    liveReload: false, // 为true则文件变化会刷新整个页面,丢失表单数据,建议置为false
    /**
     * 代理URL
     * 通常用来 应对跨域 或 根据URL区分不同的后端开发服务器地址
     */
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },// 对/api的请求会被代理到http://localhost:3000
      },
    },
    historyApiFallback: {
      /**
       * 使用时机
       * 1. 使用了HTM5 HistoryAPI的单页面应用
       *    （如果是 vue 工程，此处指`vue-router`启动了 history 模式）
       * 2. 没有生成/不想使用 dist/index.html
       *    比如访问 localhost:8080 本地开发服务器默认返回 index.html
       *    但是你希望返回的是home.html
       */
      rewrites: [
        { from: /^\/$/, to: '/home.html' },
      ],
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'home',
      filename: "home.html",
      template: "template.html",
      chunks: ["home"],
    }),
  ]
};

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || devWebpackConfig.devServer.port;
  // 下述代码的目的是 在 devWebpackConfig.devServer.port 端口号被占用的场景下,寻找一个可用的端口号，否则编译进程会被中止。
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      process.env.PORT = port;
      devWebpackConfig.devServer.port = port;

      devWebpackConfig.plugins.push(
        new FriendlyErrorsWebpackPlugin({
          compilationSuccessInfo: {
            messages: [
              `\tApp running at:\n\t- Local:   http://localhost:${port}/\n\t- Network: http://${webpackDevServer.internalIPSync("v4")}:${port}/
              `,
            ],
          },
        })
      );
      resolve(devWebpackConfig);
    }
  });
});

```

### resolve

通常用来配置模块导入时的路径别名，解析模块的文件格式顺序。

```js
const path = require('path');
const appDir = process.cwd();
const resolveApp = (relativePath) => path.resolve(appDir, relativePath);
module.exports = {
  resolve: {
    /**
     * 能够使用户在引入模块时不带扩展 import DateUtil from 'util/DateUtil';
     * 尝试按顺序解析这些后缀名。
     * 如果有多个文件有相同的名字，但后缀名不同，webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀。
     */
    extensions: [".js", ".vue", ".json", ".ts", ".html"],
    alias: {
      "@": resolveApp("src"),
      images: resolveApp("src/assets/images"),
      styles: resolveApp("src/assets/styles"),
      components: resolveApp("src/components"),
      example: resolveApp("src/example"),
      model: resolveApp("src/model"),
      locale: resolveApp("src/locale"),
      cmd: resolveApp("src/cmd"),
      http: resolveApp("src/http"),
      store: resolveApp("src/store"),
      router: resolveApp("src/router"),
      mgr: resolveApp("src/mgr"),
      util: resolveApp("src/util"),
      pages: resolveApp("src/pages"),
    },
  },
};

```

### cache

功能类似于`cache-loader`的缓存配置，用于改善开发模式二次构建速度，但是会增加第一次构建的时间。

```js
module.exports = {
  mode:'development',
  cache: {
    type: "filesystem", // 将 cache 类型设置为内存或者文件系统。 'memory' | 'filesystem'
    buildDependencies: {
      config: [__filename], // 此处这个配置我不太明白也没找到合适的资料,直接照写的文档推荐配置,如果有人知道可以简述一下或告知我去哪里获取相关解释资料
    },
  },
};

```

### externals

外部扩展**防止**将某些 `import` 的包(package)**打包**到 bundle 中，而是在运行时(runtime)再去从外部获取这些*扩展依赖*（比如通过CDN方式引入，需要在HTML模板中配置）。

通常用于改善构建速度，抽离不需要改动的第三包降低打包体积。

```js
module.exports = {
  externals: {
    vue: "Vue",
    "vue-router": "VueRouter",
    vuex: "Vuex",
    "vue-i18n": "VueI18n",
    axios: "axios",
    echarts: "echarts"
  },
};

```

### optimization

优化配置，包括但不限于模块id配置（有利于缓存），树摇，代码压缩混淆，拆包。

```bash
npm install terser-webpack-plugin@5 -D
npm install css-minimizer-webpack-plugin@3 -D
npm install mini-css-extract-plugin@2 -D
```

```js
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,  // 抽取css
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.(scss|sass)$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  optimization: {
    // 用来生成模块id的算法,deterministic利于缓存改善构建速度,named利于开发
    chunkIds: "deterministic",
    moduleIds: "deterministic",
    usedExports: true, // 启动树摇
    splitChunks: {
      chunks: "all", // 哪些chunk需要被拆, 异步/非异步 默认异步chunk会被拆出
      minSize: 1024 * 20, // 生成chunk最小体积
      // maxSize: 1024 * 244, // 大于maxSize会被拆成小包,拆包会导致包数激增,不拆的话可能会出现单包过大的问题
      minChunks: 2, // 拆分前必须共享模块的最小 chunks 数 分包不能太细 全拆会导致并发请求过多 浏览器有并发请求数量限制
      /**
       * 缓存组
       * 默认配置会将 node_modules下的模块全都打包进vendors的chunk内
       * 这会导致在第一次进入页面时全量加载vendors这个大包
       * 为了应对这个问题,通常采用externals或cacheGroups
       */
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 1,
        },
        echarts: {
          test: /[\\/]node_modules[\\/]_?echarts(.*)/,
          name: 'vendors_echarts',
          priority: 2,
          reuseExistingChunk: true,
        },
        zrender: {
          name: 'vendors_zrender',
          test: /[\\/]node_modules[\\/]_?zrender(.*)/,
          priority: 3,
          reuseExistingChunk: true,
        },
        elementUI: {
          name: "chunk-elementUI",
          test: /[\\/]node_modules[\\/]_?element-ui(.*)/,
          priority: 4,
          reuseExistingChunk: true,
        },
      },
    },
    /**
     * 将 optimization.runtimeChunk 设置为 true 或 'multiple'，会为每个入口添加一个只含有 runtime 的额外 chunk。
     * runtime相关的代码指的是在运行环境中，对模块进行解析、加载、模块信息相关的代码；
     */
    runtimeChunk: {
      name: "runtime",
    },
    minimize: true, // 压缩代码配置,开发模式下如果不显式的将此处设置为true，minimizer疑似不生效，在webpack文档中的css-minimizer-webpack-plugin部分提到过一句
    minimizer: [
      /**
       * 通过提供 TerserPlugin 实例来配置如何对代码进行压缩
       */
      new TerserPlugin({
        parallel: true, // 多线程
        extractComments: false, // 注释单独提取
        terserOptions: {
          compress: {
            drop_console: true // 清除console输出
          },
          format: {
            comments: false, // 清除注释
          },
          toplevel: true, //  声明提前
          keep_classnames: true, // 类名不变
        },
      }),
      /**
       * 优化压缩CSS
       * CssMinimizerPlugin需要与MiniCssExtractPlugin协同使用
       */
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: {
                removeAll: true // 移除注释
              },
            },
          ],
        },
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:6].css",
      chunkFilename: "css/chunk_[name].[contenthash:6].css",
      ignoreOrder: true,
    })
  ],
};

```

### module

配置 webpack 如何处理工程中不同格式模块。

webpack在打包时会先从预先配置好的入口文件开始，生成一个依赖关系图，这个依赖关系图中会包含当前应用使用到的模块。

虽然webpack天生支持一些原生模块（比如`.js` `.json`），但是为了达到某些目的（比如兼容旧版本JS代码）仍然需要对原生模块使用一些`loader`进行解析。此外，在打包某些非原生模块（比如`.vue` `.ts`）时也需要依赖对应`loader`解析，我们可以通过`module.rules`配置来指定这些模块的解析规则。

简单来说，`loader`让webpack具备了理解`.js`格式以外的其他格式文件的能力。

#### **rules**

Type（简明）：

```typescript
type rules = Array<rule>

type rule =
  {
    test: RegExp; // 约束当前rule匹配哪些资源 通常是匹配文件格式的正则
    include?: RegExp | string | Array<string>; // 匹配符合条件的模块 通常是路径
    exclude?: RegExp | string | Array<string>; // 屏蔽符合条件的模块 通常是路径
    type?: string; // 匹配资源模块类型 详见https://webpack.docschina.org/guides/asset-modules/
    use: Array<UseEntry>; // 配置当前rule匹配到的资源模块将会调用那些loader解析,调用顺序为倒序
    generator?: {
      filename?: string; // 决定了输出文件的名称
    };
    parser?: {
      dataUrlCondition?: {
        maxSize: number; // 文件大小小于maxSize的模块会被作为一个 Base64 编码的字符串注入到包中， 否则模块文件会被生成到输出的目标目录中。
      }
    };
    oneOf?: Array<rule>; // 表示只使用用第一个匹配到的规则,用来改善匹配性能
  }

type UseEntry = string | {
  loader: string; // 指定loader
  options?: string | object; // loader 选项
}

```

> 注意，如果`exclude`和`include`同时存在，取二者交集。

#### 资源模块类型  asset module type

在过去的webpack版本中，针对资源文件模块的解析，通常需要使用到`url-laoder` `file-loader`。

而在webpack5这个版本，不再需要额外配置`loader`，而是采取 资源模块类型（asset module type）：

- `asset/resource` 发送一个单独的文件并导出 URL。之前通过使用 `file-loader` 实现。
- `asset/inline` 导出一个资源的 data URI。之前通过使用 `url-loader` 实现。
- `asset/source` 导出资源的源代码。之前通过使用 `raw-loader` 实现。
- `asset` 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 `url-loader`，并且配置资源体积限制实现。

```js
module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/i,
        type: "asset",
        generator: {
          filename: "img/[name].[contenthash:6][ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10000, // 文件大小超过maxSize的模块单独导出成单独文件,否则内联到包中
          },
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i,
        exclude: /node_modules/,
        type: "asset/resource", // 直接导出单独文件
        generator: {
          filename: "media/[name].[contenthash:6].[ext]",
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name].[contenthash:6].[ext]",
        },
      },
    ]
  },
};

```

#### 多进程构建

使用`thread-loader`可以让一些比较耗时的`loader`解析由单进程转为多进程，达到加速构建的目的。

```bash
npm install --save-dev thread-loader
```

```js
module.exports = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: [/node_modules/],
        use: ["thread-loader", "babel-loader"],
      },
    ]
  },
};

```

#### CSS和CSS预处理器

弃用node-sass，使用sass（dart-sass）

sassloader不应该使用thread-loader

[TypeError: loaderContext.getLogger is not a function in utils.js · Issue #993 · webpack-contrib/sass-loader (github.com)](https://github.com/webpack-contrib/sass-loader/issues/993)

[sass-loader 12.3.0 breaks compatibility with thread-loader · Issue #1016 · webpack-contrib/sass-loader (github.com)](https://github.com/webpack-contrib/sass-loader/issues/1016)



##### scss  icss

[将 SCSS 变量分享给 JS - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/352741442)

[css-loader | webpack 中文文档 (docschina.org)](https://webpack.docschina.org/loaders/css-loader/#separating-interoperable-css-only-and-css-module-features)

[CSS 相关 | Vue CLI (vuejs.org)](https://cli.vuejs.org/zh/guide/css.html#css-modules)

```js
module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
          "thread-loader",
          "style-loader", // 以style标签的方式将样式插入到DOM中
          {
            loader: "css-loader",
            options: {
              /**
               * importLoaders 选项允许你配置在 css-loader 之前有多少 loader 应用于 @imported 资源与 CSS 模块/ICSS 导入。
               * 这里的意思是当在css文件中遇到被@import的模块时,会重新走css-loader之前的loader流程
               * 通常来说,css-loader后面跟着几个loader,importLoaders就要设置为几
               */
              importLoaders: 1,
            },
          },
          "postcss-loader", // postcss的实际功能依赖于其配置的插件,比如前缀,新特性polyfill等
        ],
      },
      {
        test: /\.(scss|sass)$/i,
        exclude: /node_modules/,
        use: [
          "thread-loader",
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
    ]
  },
};

```

##### postcss-loader

```bash
npm install postcss postcss-loader postcss-preset-env -D
```

`postcss`是一个使用JS插件转换样式的工具，其功能主要**由配置的插件提供**。

> `postcss-preset-env`插件提供autoprefixer和现代CSS属性polyfill功能。

通常使用配置文件`postcss.config.js`来配置`postcss`。

```js
// postcss.config.js
module.exports = {
  plugins: [
    [
      "postcss-preset-env",
      {
        // 其他选项
      },
    ],
  ],
};

```

###### browserslist

为了统一项目的浏览器CSS特性和JS特性兼容版本范围，你需要维护一个配置`browserslist`。

你可以通过以下方式维护统一的兼容性配置：

在`package.json`中配置

```json
// package.json
{
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}

```

创建一个`.browserslistrc`文件

```
# Browsers that we support

last 2 version
> 1%
maintained node versions
not dead
not ie <= 8

```

#### vue

thread-loader对vue-loader的构建是否有积极作用？（测试了6次未发现明显改善）

[15.0.0 support for rules.oneOf config · Issue #1204 · vuejs/vue-loader (github.com)](https://github.com/vuejs/vue-loader/issues/1204)

[老项目vue2.x误用了vue3的插件问题_vue-loader版本_七里汀的博客-CSDN博客](https://blog.csdn.net/xy_peng/article/details/127221778)

vue-template-compiler需要控制在2.6.14以前，从2.7开始支持vue3的兼容

**vue-loader插件最为适合的版本是[15.9.8](https://www.npmjs.com/package/vue-loader/v/15.9.8)， vue3的语法编译就在[15.10.0](https://www.npmjs.com/package/vue-loader/v/15.10.0)以及版本以上**

```bash
npm install -D vue vue-loader vue-template-compiler
```

```js
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // 它会应用到普通的 `.js` 文件
      // 以及 `.vue` 文件中的 `<script>` 块
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    // 这个插件必须要引入
    new VueLoaderPlugin()
  ]
}

```

#### js ts

esbuild-loader?

[webpack + esbuild-loader 提升构建速度 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/596805639)

```js
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: [
          /node_modules/,
        ],
        use: [
          "thread-loader",
          "babel-loader?cacheDirectory",
        ],
      },
      {
        test: /\.tsx?$/i,
        exclude: /node_modules/,
        use: [
          "thread-loader",
          "babel-loader?cacheDirectory",
        ],
      },
    ],
  },
  plugins: [
    // ts类型检测
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: "write-references",
      },
    }),
  ],
};


```

##### babel.config.js

```js
module.exports = {
  presets: [
    ["@babel/preset-env", {
    }],
    ["@babel/preset-typescript"],
    "@vue/babel-preset-jsx"
  ],
  plugins: [
    ["@babel/plugin-transform-runtime", {
    }],
    '@babel/plugin-transform-modules-commonjs',
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ]
  ],
}

```

### plugins

#### html-webpack-plugin

```bash
npm i html-webpack-plugin@5 -D
```

该插件的作用是在 `out.path` 目录下根据模板生成一个包含入口 bundle 的 HTML 文件，这个生成的 HTML 文件就是在浏览器最终展示的页面文件。

在生成的这个 HTML 文件中会以`script/link`标签形式引用 webpack 打包后生成的 bundle 静态 JS 文件和样式 CSS 文件（如果有的话）。默认模板文件在 `/node_module/html-webpack-plugin/default_index.ejs` ，你也可以自行指定模板文件。

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js',
  },
  plugins: [new HtmlWebpackPlugin()], // 不配置 chunks 参数时默认生成的 HTML 文件会引用所有的 bundle 文件
};
```

这将会生成一个包含以下内容的  `dist/index.html`  文件：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Webpack App</title>
  </head>
  <body>
    <script src="index_bundle.js"></script>
  </body>
</html>
```

上述默认配置生成的 HTML 文件中 `script` 标签会引入 `index_bundle.js` 。**如果你拥有多个入口，使用默认配置生成的 HTML 文件将会引入所有生成的入口bundle文件。**

| Name                | Description                                                  | Default        | Type                |
| ------------------- | ------------------------------------------------------------ | -------------- | ------------------- |
| **`title`**         | 生成 HTML  文档的 title 标题。<br />需要在模板文件用`ejs`语法显式声明 `<title><%= htmlWebpackPlugin.options.title %></title>` | `Webpack App`  | `{String}`          |
| **`filename`**      | 生成 HTML 文件的文件名。<br />支持子目录写法，会生成在`out.path`目录下的子目录中(eg: `assets/admin.html`)。<br />支持占位符写法`[name]` 插件文档中提到`[name]`指入口名。多个chunk同时被引入的场景`[name]`会以何种形式解析尚未试验<br /> 支持函数写法`(entryName) => entryName + '.html'`. | `'index.html'` | `{String|Function}` |
| **`template`**      | 本地模板文件位置，支持相对路径和绝对路径，相对路径相对于`context`目录。<br />默认使用`src/index.ejs`（如果有的话）或`/node_modules/html-webpack-plugin/default_index.ejs` | ``             | `{String}`          |
| **`inject`**        | `true || 'head' || 'body' || false` <br />静态资源注入位置<br />`'body'`将JS资源插入到`body`元素底部<br />`'head'` 将JS资源插入到`head`元素<br />`'true'`根据`scriptLoading`配置将静态资源插入到head/body<br /> `false` 禁用自动注入   [inject:false example](https://github.com/jantimon/html-webpack-plugin/tree/master/examples/custom-insertion-position) | `true`         | `{Boolean|String}`  |
| **`chunks`**        | 配置哪些 chunk （对应entry对象的key键名）插入到 HTML 文档中  | `?`            | `{?}`               |
| **`excludeChunks`** | 配置哪些 chunk 被屏蔽                                        | ``             | `{Array.<string>}`  |



在开发过程中可能需要自定义 HTML 文件名、`document.title`、生成 HTML 文件内容模板、配置 `script` 标签的位置等，通常不会直接使用插件的默认配置转而进行定制化配置。

比如，如果你希望不同的 HTML 文件引用不同的 bundle 文件（多入口场景），参考以下配置：

```html
// template.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"/>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
  </body>
</html>
```

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name]_bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'pageOne',
			// 注意需要有一个index.html,否则开发环境可能访问不到index.html会报404
      filename: "index.html",
      template: "template.html",
      chunks: ["pageOne"],
    }),
    new HtmlWebpackPlugin({
      title: 'pageTwo',
      filename: "pageTwo.html",
      template: "template.html",
      chunks: ["pageTwo"],
    }),
    new HtmlWebpackPlugin({
      title: 'pageThree',
      filename: "pageThree.html",
      template: "template.html",
      chunks: ["pageThree"],
    }),
  ]
};

```

在开发环境下，这个插件还可能会和 `devServer.historyApiFallback` 协同使用，参考以下配置：

> historyApiFallback使用时机：
>
> 1. 使用了HTM5 History API的单页面应用（如果是 vue 工程，此处指`vue-router`启动了 **history 模式**）
> 2. 没有生成/不想使用  dist/index.html  比如访问 `localhost:8080`本地开发服务器默认返回 index.html ，但是你希望返回的是`home.html`

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: {
    home: './src/home/index.js',
    pageOne: './src/pageOne/index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name]_bundle.js',
  },
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/home.html' },
        { from: /^\/pageTwo/, to: '/pageTwo.html' },
      ],
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'home',
      filename: "home.html",
      template: "template.html",
      chunks: ["home"],
    }),
    new HtmlWebpackPlugin({
      title: 'pageTwo',
      filename: "pageTwo.html",
      template: "template.html",
      chunks: ["pageTwo"],
    }),
  ]
};

```

> 虽然`html-webpack-plugin`可以使用`.html`模板文件，这种格式的模板文件可以胜任简单场景，但是在复杂场景下并不能达到预期效果（参见[html-webpack-plugin 文档解释](https://github.com/jantimon/html-webpack-plugin/blob/main/docs/template-option.md)）。
>
> `.html`格式模板文件默认使用`html-webpack-plugin`中内置的`html-loader`和`ejs-loader`协同解析。
>
> 如果你针对`.html`格式的文件全局配置了`html-loader`，会造成`.html`模板解析异常（单靠`html-loader`无法解析`ejs`语法）。
>
> 如果你在`html-loader`通过`exclude`屏蔽了一部分`.html`模板文件，那`.html`模板文件中如果引入另一个`.html`文件（`.html`模板文件或普通的`.html`文件）会造成解析异常，需要手动调用`html-loader`去解析引入的`.html`文件。
>
> **如果你遇到了上述问题，请仔细阅读以下资料**
> [html-webpack-plugin | Issues #1673](https://github.com/jantimon/html-webpack-plugin/issues/1673)
>
> [html-webpack-plugin | Issue #1681 ](https://github.com/jantimon/html-webpack-plugin/issues/1681)
>
> [html-loader  | Issue #291](https://github.com/webpack-contrib/html-loader/issues/291)
>
> https://github.com/jantimon/html-webpack-plugin/tree/main/examples/custom-template
>
> **如果找不到解决办法，请尝试查阅**
>
> https://github.com/jantimon/html-webpack-plugin/tree/main/examples



## 构建性能

[构建性能 | webpack 中文文档 (docschina.org)](https://webpack.docschina.org/guides/build-performance/)

## 小结





## 参考资料

## 附录

##
