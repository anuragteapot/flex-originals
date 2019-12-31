#!/bin/bash
# if [ $# -eq 0 ]
#   then
#     echo "Supply a path to a tgz file!"
#     exit 1
# fi

# Register color
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;35m'
BLUE='\033[0;34m'
NC='\033[0m'


SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"
# DATE=$(date +%Y-%m-%d-%H-%M)

echo
printf "Usage: command list [${BLUE}options${NC}]\n"
echo

printf "${BLUE}=========================================================================================================${NC}\n"
echo 'Running docker containers....'
printf "\n"
sudo docker ps
printf "${BLUE}=========================================================================================================${NC}\n"
echo 'List of avaliable backups : '

printf "  Options : [${BLUE}arguments${NC}]\n"
echo
for file in backups/*; do
    printf "${RED}    -> $(basename "$file")\n${NC}"
done
echo
printf "${BLUE}==========================================${NC}\n"
echo 
echo 'Enter container name : '
read -p "-> " get_command
command_type=($(echo $get_command | tr " " "\n"))
printf "${GREEN}-> ${command_type[0]} Container selected!"
echo 
echo
echo 'Select backup dates listed above : '
read -p "-> " get_command
backup_date=($(echo $get_command | tr " " "\n"))
echo
printf "${GREEN}-> ${backup_date[0]} Dackup date selected!"
echo 

sudo docker ps -a | grep ${command_type[0]} &> /dev/null
if [ $? = 0 ]; then
  sudo docker exec -i ${command_type[0]} sh -c 'mongorestore --archive' < $SCRIPTPATH/backups/$backup_date/db.dump
else
  echo "${command_type[0]} container is not running."
  exit 1
fi