#!/bin/bash
if [ $# -eq 0 ]
  then
    echo "Supply a path to a tgz file!"
    exit 1
fi

SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
DATE=$(date +%Y-%m-%d-%H-%M)

docker ps -a | grep 'mongo' &> /dev/null
if [ $? = 0 ]; then

  if [ -f $1 ]; then
    mkdir -p $SCRIPTPATH/backups/$DATE-restore
    unzip $1 -d $SCRIPTPATH/backups/$DATE-restore
    # docker exec -it mongo bash -c "rm -fr /restore ; mkdir /restore"
    # docker cp $SCRIPTPATH/backups/$DATE-restore/flexoriginals mongo:/restore
    ## Only if you get errors about existing indexes, use this instead:
    ## docker exec -t mongo bash -c "mongorestore --drop --noIndexRestore --db flexoriginals /restore/flexoriginals/"
    # docker exec -t mongo bash -c "mongorestore --drop --db flexoriginals /restore/flexoriginals/"
  fi
else
  echo "mongo container is not running"
  exit 1
fi