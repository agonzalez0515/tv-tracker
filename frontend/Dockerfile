FROM node:13-alpine

WORKDIR /usr/src/app/frontend

ENV PATH /usr/src/app/frontend/node_modules/.bin:$PATH

COPY package.json /usr/src/app/frontend/package.json
RUN npm install
RUN npm install react-scripts@3.0.1 -g

COPY . .

EXPOSE 3001

CMD [ "npm", "start" ]
