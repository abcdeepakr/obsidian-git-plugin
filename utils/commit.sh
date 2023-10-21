cd ../../../../
git add .
git commit -m "$(echo $@) $(date +'%Y-%m-%d %H:%M:%S')"
git push
