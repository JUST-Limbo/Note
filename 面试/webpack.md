## hash、chunkhash、contenthash

```js
    output: {
      path: resolveApp("./build"),
      filename: "js/[name].[chunkhash:6].bundle.js",
      chunkFilename: "js/[name].[contenthash:6].chunk.js",
      publicPath: ""
    },
```

hash：一整个项目，一次打包，只有一个hash值

chunkhash：从入口entry出发，到它的依赖，以及依赖的依赖，依赖的依赖的依赖，等等，一直下去，所打包构成的代码块(模块的集合)叫做一个chunk，也就是说，入口文件和它的依赖的模块构成的一个代码块，被称为一个chunk。 所以，一个入口对应一个chunk，多个入口，就会产生多个chunk 所以，单入口文件，打包后chunkhash和hash值是不同的，但是效果是一样的

contenthash：只和内容有关系

hash -> chunkhash -> contenthash，生成效率依次降低，精度依次增高。

## 编译过程

- 初始化：启动构建，读取与合并配置参数，加载 Plugin，实例化 Compiler
- 编译：从 Entry 出发，针对每个 Module 串行调用对应的 Loader 去翻译文件的内容，再找到该 Module 依赖的 Module，递归地进行编译处理
- 输出：将编译后的 Module 组合成 Chunk，将 Chunk 转换成文件，输出到文件系统中