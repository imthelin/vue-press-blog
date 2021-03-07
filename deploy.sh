#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e
# 生成静态文件
npm run build
# 进入生成的文件夹
cd docs/.vuepress/dist
git init
git config user.email "243404855@qq.com"
git config user.name "imthelin"
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

# 把上面的 <USERNAME> 换成你自己的 Github 用户名，<REPO> 换成仓库名，
# 比如我把 github pages 设置在仓库blog vue-pages分支（master 为 git init 的本地初始化默认分支）
# 则如下
git push -f git@github.com:imthelin/blog.git master:vue-pages

# 回到命令脚本执行前的工作目录
cd -