FROM node:10

WORKDIR /usr/src

COPY package*.json ./

RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y ffmpeg

RUN npm install

COPY . .

EXPOSE 3333
EXPOSE 3355
EXPOSE 3000

CMD ["npm", "run", "prod"]
