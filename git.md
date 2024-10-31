## 工作机制

![image-20220312223454968](assets/git.assets/image-20220312223454968.png)

## 常用命令

| 命令                    | 作用                                              |
| ----------------------- | ------------------------------------------------- |
| git init                | 初始化本地库                                      |
| git status              | 查看本地库状态                                    |
| git add .               | 将所有工作区文件添加到暂存区                      |
| git commit -m 'xxx'     | 将暂存区提交到本地库                              |
| git reflog              | 查看历史记录，所有分支，包括被删除的commit和reset |
| git log                 | 显示从最近到最远的详细提交日志                    |
| git reset --hard 版本号 | 版本穿梭                                          |
| git rm --cached file    | 删除仓库 暂存区中的文件，保留本地的文件           |

Git 切换版本，底层其实是移动的 HEAD 指针，具体原理如下图所示。

![image-20220312231507461](assets/git.assets/image-20220312231507461.png)

## 用户签名

```bash
git config --global user.name 用户名 #后续无值表示读取,有值表示写入,下同
git config --global user.email 邮箱
git config --list # 获取配置信息

// 保存在 C:/users/xxx/.gitconfig
```

## 分支操作

![image-20220312231812843](assets/git.assets/image-20220312231812843.png)

![image-20220312231928653](assets/git.assets/image-20220312231928653.png)

### 分支命令

| 命令                                  | 作用                             |
| ------------------------------------- | -------------------------------- |
| git branch 分支名                     | 创建分支                         |
| git branch                            | 列出当前分支清单                 |
| git branch -v                         | 查看各个分支最后一个提交信息     |
| git branch --delete 分支名            | 删除本地分支                     |
| git branch -D 分支名                  | 强制删除                         |
| git push origin --delete 分支名       | 删除远程分支                     |
| git push origin :分支名               | (分支名前的冒号代表删除)         |
| git checkout 分支名                   | 切换分支                         |
| git checkout --orphan 分支名          | 创建空白分支                     |
| git merge 分支名                      | 把指定的分支合并到**当前分支**上 |
| git push --set-upstream origin 分支名 | 将本地新分支推送到远端           |
| git branch -m <oldname> <newname>     | 重命名本地分支 **-M**强制执行    |
| git branch -m <newname>               | 重命名当前活动的分支             |
| git config --list --local             | 获取当前Git仓库的配置信息        |

### 合并冲突

冲突产生的表现  后面状态为 MERGING

![image-20220312233450633](assets/git.assets/image-20220312233450633.png)

1. 查看状态（检测到有文件 有两处修改）

![image-20220312233721538](assets/git.assets/image-20220312233721538.png)

2. 编辑有冲突的文件，删除特殊符号，决定要使用的内容

特殊符号：<<<<<<< HEAD 当前分支的代码 ======= 合并过来的代码 >>>>>>> hot-fix

![image-20220312233905588](assets/git.assets/image-20220312233905588.png)

3. 添加到暂存区
4. 执行提交

master、hot-fix 其实都是指向具体版本记录的指针。当前所在的分支，其实是由HEAD
决定的。所以创建分支的本质就是多创建一个指针。
HEAD 如果指向master，那么我们现在就在master 分支上。
HEAD 如果指向hotfix，那么我们现在就在hotfix 分支上。

## 远程仓库

| 命令                           | 作用                                       |
| ------------------------------ | ------------------------------------------ |
| git remote -v                  | 查看                                       |
| git remote add <name> <url>    | 起别名                                     |
| git push 别名 分支             | 将本地分支内容推送到远程仓库               |
| git clone 远程仓库             | 拉取远程仓库内容到本地                     |
| git pull 远程仓库别名 远程分支 | 将远程仓库指定分支拉取并与当前本地分支合并 |
| git fetch --prune              | 更新本地的远程跟踪分支列表，--prune        |

[git以及sourcetree使用问题（一） - gongziyiyi - 博客园 (cnblogs.com)](https://www.cnblogs.com/gongziyiyi/p/11012662.html)

本地有仓库，远程仓库无内容

```git
git add *
git commit -m '提交的信息'
git remote add origin https://github.com/JUST-Limbo/Note.git
git push origin 分支名(默认只有一个master分支)
git push -all origin 将所有分支推送到仓库
```

注意：push是将本地库代码推送到远程库，如果本地库代码跟远程库代码版本不一致，push的操作是会被拒绝的。也就是说， 要想 push成功，一定要保证本地库的版本要比远程库的版本高！ 因此一个成熟的程序员在动手改本地代码之前，一定会先检查下远程库跟本地代码的区别！如果本地的代码版本已经落后，切记要先 pull拉取一下远程库的代码，将本地代码更新到最新以后，然后再修改，提交，推送

**本地仓库已经被追踪，切换远程仓库地址**

```bash
git remote set-url origin https://newrepository.url/repo.git
git push origin --tags
git push -u origin --all // 将本地所有分支推送到远程仓库

```



## 跨团队协作

![image-20220312234418753](assets/git.assets/image-20220312234418753.png)

## rebase

git pull = git fetch + git merge

git pull --rebase = git fetch + git rebase

merge会产生新节点，之前的提交分开显示

rebase不会产生新节点，是将两个分支融合成一个线性提交



## 回退

**reset三种模式区别**

**--hard**：重置位置的同时，直接将 **working Tree工作目录**、 **index 暂存区**及 **repository** 都重置成目标**Reset**节点的內容,所以效果看起来等同于清空暂存区和工作区。

![image-20241031170014615](assets/git.assets/image-20241031170014615.png)

**--soft**：重置位置的同时，保留**working Tree工作目录**和**index暂存区**的内容，只让**repository**中的内容和 **reset** 目标节点保持一致，因此原节点和**reset**节点之间的【差异变更集】会放入**index暂存区**中(**Staged files**)。所以效果看起来就是工作目录的内容不变，暂存区原有的内容也不变，只是原节点和**Reset**节点之间的所有差异都会放到暂存区中。

![image-20241031165709435](assets/git.assets/image-20241031165709435.png)

**--mixed（默认）**：重置位置的同时，只保留**Working Tree工作目录**的內容，但会将 **Index暂存区** 和 **Repository** 中的內容更改和reset目标节点一致，因此原节点和**Reset**节点之间的【差异变更集】会放入**Working Tree工作目录**中。所以效果看起来就是原节点和**Reset**节点之间的所有差异都会放到工作目录中。

![image-20241031165733143](assets/git.assets/image-20241031165733143.png)

```bash
# 远程仓库强制回退
git reset --hard <commit id>
git push -f
```

**强制将本地代码库重置为远程分支的最新版本**

```bash
git reset --hard origin/<branch-name>
```

**步进**

```bash
git reset HEAD~2
```





参考资料

[Git Reset 三种模式 - 简书 (jianshu.com)](https://www.jianshu.com/p/c2ec5f06cf1a)

[Git reset三种常用模式区别和用法_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV14C4y1q78x/?spm_id_from=333.337.search-card.all.click&vd_source=c2b3add750ed074eef86a1e9f1e3f411)

## 放弃解决冲突

```bash
git merge --abort
```

## 区分文件名大小写

```bash
git config core.ignorecase false // false区分大小写，true不区分
```



## cherry-pick

将指定的提交应用到当前分支上，并创建一个新的提交。

```bash
git cherry-pick <commit id>
```
