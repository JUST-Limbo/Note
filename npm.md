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
-	npm uninstall --save 包名
	-	删除的同时去除依赖信息
	-	npm un -S 包名
-	npm help
	-	查看使用帮助

- npm 命令 -help
  + 查看指定命令的使用帮助

清楚npm缓存

```bash
npm cache clear --force
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

