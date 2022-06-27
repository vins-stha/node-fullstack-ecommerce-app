FROM node:alpine3.14

WORKDIR ./server

COPY *.json .

RUN npm install

RUN npm install nodemon

COPY . . 

EXPOSE 5000

CMD ["node", "dist/server.js"]

