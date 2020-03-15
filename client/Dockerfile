FROM node:13-alpine

WORKDIR /usr/src/app/server/client

ENV PATH /usr/src/app/server/client/node_modules/.bin:$PATH

COPY package.json /usr/src/app/server/client/package.json
RUN npm install
RUN npm install react-scripts@3.0.1 -g --silent

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
