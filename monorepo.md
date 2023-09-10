## Workspace

在 Monorepo 中，Workspace 指的是包含所有项目的代码仓库的工作空间。

## pnpm-workspace.yaml

一个 workspace 的根目录下必须有 [`pnpm-workspace.yaml`](https://pnpm.io/zh/pnpm-workspace_yaml) 文件

`pnpm-workspace.yaml` 定义了 [工作空间](https://pnpm.io/zh/workspaces) 的根目录，并能够使您从工作空间中包含 / 排除目录 。 默认情况下，包含所有子目录。

```yaml
packages:
  # all packages in direct subdirs of packages/
  - 'packages/*'
  # all packages in subdirs of components/
  - 'components/**'
  # exclude packages that are inside test directories
  - '!**/test/**'
```

## 命令行参数

`-w`

表示在workspace根目录运行命令

```bash
pnpm install react react-dom -w
#  pnpm 安装全局共用的包，-w表示把包安装在 root 下
```

`-r`

表示在工作区的每个项目中运行命令

```bash
pnpm i dayjs -r --filter @test/web
```

`-F,--filter <package_name>`

过滤允许您将命令限制于包的特定子集。

## 子项目的局部依赖安装

通过`--filter`

```bash
pnpm i axios --filter hello-world
```

直接进入子项目录进行安装

```bash
cd hello-world
pnpm i axios 
```

## 子项目的引用

```
├── packages
│   ├── ui
│   ├── utils
│   └── web
```

通过配置各子项`package.json`的`name`和`main`，来声明对应的包名和入口文件。（`@test/ui` `@test/utils` `@test/web`）

安装

```bash
pnpm i @test/utils -r --filter @test/ui
# 表示在@test/ui子项中安装@test/utils这个包
```

使用

```js
import {add} from '@test/utils'
```

## 强制使用特定的包管理器

以使用`pnpm`为例

`package.json`

```json
{
  "scripts": {
    "preinstall": "npx only-allow pnpm"
  }
}
```