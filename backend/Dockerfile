FROM node:17-alpine3.14

WORKDIR /app

RUN apk update && apk upgrade

RUN apk add --no-cache sqlite

COPY package*.json ./

RUN npm install

COPY . .

RUN touch ./db/database.sqlite

EXPOSE 3001

CMD ["npm", "run", "start"]