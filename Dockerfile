FROM node:10

WORKDIR /usr/src

COPY package*.json ./

RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y ffmpeg

RUN npm install
RUN npm install -g --unsafe-perm node-sass --save

COPY . .

EXPOSE 3333
EXPOSE 3355
EXPOSE 3000

CMD ["npm", "run", "prod"]
