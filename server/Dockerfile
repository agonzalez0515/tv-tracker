FROM node:13-alpine

WORKDIR /usr/src/app/server

COPY package*.json /usr/src/app/server/package.json
RUN npm install

COPY . .

EXPOSE 8000
CMD [ "npm", "run", "dev-docker"]