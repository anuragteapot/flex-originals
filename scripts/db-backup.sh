#!/bin/bash
DATE=$(date +%Y-%m-%d-%H-%M)
SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
cd $SCRIPTPATH
mkdir -p backups/$DATE
sudo docker ps -a | grep 'mongo' &> /dev/null
if [ $? = 0 ]; then
  sudo docker exec -it mongo bash -c "rm -fr /dump ; mkdir /dump ; mongodump -o /dump/"
  sudo docker cp mongo:/dump $SCRIPTPATH/backups/$DATE
  zip -r backups/$DATE.zip ./backups/$DATE
  if [ -f backups/$DATE.zip ]; then
    sudo rm -fr backups/$DATE
    find $SCRIPTPATH/backups/ -name "*.zip" -mtime +7 -delete
  fi 
else
  echo "mongo container is not running"
  exit 1
fi