#!/bin/bash

set -ux

current_branch=`git symbolic-ref HEAD`
current_commit=`git log -1 --oneline`

if [ $current_branch != "refs/heads/master" ]; then
  echo "Not on branch 'master', skipping publish step"
  exit
fi

work_dir=`mktemp -d`

npm run build
cp -r out/ $work_dir
rm -rf out/
git checkout gh-pages
git merge src
rm -rf pages static scripts LICENSE next.config.js package-lock.json package.json README.md
cp -r $work_dir/* .
git add -A
git commit -m "Build from $current_commit"
git checkout master
