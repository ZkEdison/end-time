#!/usr/bin/env sh

# 发生任何错误时终止
set -e

# 构建
yarn build

# 进入输出产物文件夹
cd dist

# 如果你要部署到自定义域名
# touch CNAME
# echo 'c-end-work.trycatchyou.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果你要部署在 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果你要部署在 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:ZkEdison/end-time.git master:gh-pages

cd -
