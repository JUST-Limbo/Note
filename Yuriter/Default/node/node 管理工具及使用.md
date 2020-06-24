# node 管理工具及使用

## 版本管理工具nvm

### 介绍

nvm全名`node.js version management`，顾名思义是一个nodejs的版本管理工具。通过它可以安装和切换不同版本的nodejs。

### 下载地址

安装地址：[https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)

### nvm的使用

进入安装的目录，在cmd中使用命令

```c
nvm -h //查看nvm的指令
nvm list //查看本地已经安装的node版本列表
nvm list available //查看可以安装的node版本
nvm install latest //安装最新版本的node
nvm install [version][arch] //安装指定版本的node 例如：nvm install 10.16.3 安装node v10.16.3 arch表示电脑的位数 如果电脑需要安装32位的， 则运行：nvm install 10.16.3 32
nvm use [version] //使用node 例如：nvm use 10.16.3
nvm uninstall [version] //卸载node
```

## 镜像管理工具nrm

### 介绍

nrm全名`npm registry manager`是npm的镜像源管理工具，有时候国外资源太慢，使用这个就可以快速在npm源间切换。

### 安装nrm

`npm i -g nrm`

### nrm使用

1. 查看可选的源：`nrm ls`
2. 切换源： `nrm use [name]`
3. 增加源：`nrm add [registry] [url]`
4. 删除源：`nrm del [name]`
5. 测试速度：`nrm test [name]`