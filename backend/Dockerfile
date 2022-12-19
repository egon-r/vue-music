FROM node:19-slim

WORKDIR /app

RUN apt update
RUN apt install -y ffmpeg

COPY package.json .
RUN npm install

EXPOSE 3000
RUN ["npm", "run", "start"]