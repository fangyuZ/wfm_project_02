FROM node:17

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./build/ .

EXPOSE 3000

CMD [ "node", "index.js" ]
