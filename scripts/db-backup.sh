#!/bin/bash
DATE=$(date +%Y-%m-%d-%H-%M)

# Register color
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;35m'
BLUE='\033[0;34m'
NC='\033[0m'

SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
cd $SCRIPTPATH
mkdir -p backups/$DATE

printf "${BLUE}=========================================================================================================${NC}\n"
echo 'Running docker containers....'
printf "\n"
sudo docker ps
printf "${BLUE}=========================================================================================================${NC}\n"
echo 'Enter container name : '
read -p "-> " get_command
command_type=($(echo $get_command | tr " " "\n"))
sudo docker ps -a | grep ${command_type[0]} &> /dev/null
if [ $? = 0 ]; then
  echo ''
  printf "Starting Backup! -> ${command_type[0]}\n"
  echo ''
  sudo docker exec -i ${command_type[0]} sh -c 'mongodump --archive --host 0.0.0.0 --port 27017 -u "$APP_MONGO_USER" -p "$APP_MONGO_PASS" -d "$APP_MONGO_DB"' > $SCRIPTPATH/backups/$DATE/db.dump
  echo
  printf "Backup Successfully Done! -> ${command_type[0]} -> ${SCRIPTPATH}/backups/${DATE}/db.dump\n"
  echo ''
else
  echo "${command_type[0]} container is not running."
  exit 1
fi