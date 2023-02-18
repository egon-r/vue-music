FROM node:19-slim

WORKDIR /app

RUN apt update
RUN apt install -y ffmpeg

COPY package.json .
RUN npm install

COPY src/ ./src/

EXPOSE 3000
CMD ["npm", "run", "start"]