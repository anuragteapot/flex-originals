#!/bin/bash
if [ $# -eq 0 ]
  then
    echo "Supply a path to a zip file!"
    exit 1
fi

SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
DATE=$(date +%Y-%m-%d-%H-%M)

docker ps -a | grep 'mongo'
if [ $? = 0 ]; then

  if [ -f $1 ]; then
    mkdir -p $SCRIPTPATH/backups/$DATE-restore
    tar -zx -f $1 -C $SCRIPTPATH/backups/$DATE-restore
    docker exec -it mongo bash -c "rm -fr /restore ; mkdir /restore"
    docker cp $SCRIPTPATH/backups/$DATE-restore/mongo mongo:/restore
    ## Only if you get errors about existing indexes, use this instead:
    ## docker exec -t wekan-db bash -c "mongorestore --drop --noIndexRestore --db wekan /restore/wekan/"
    docker exec -t wekan-db bash -c "mongorestore --drop --db wekan /restore/wekan/"
  fi
else
  echo "wekan-db container is not running"
  exit 1
fi