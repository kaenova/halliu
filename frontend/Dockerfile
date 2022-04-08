# Development
FROM node:14.16.1-alpine3.10

WORKDIR /app
COPY package.json package.json

# RUN apk add tzdata
# RUN cp /usr/share/zoneinfo/Asia/Jakarta /etc/localtime

COPY . .
RUN npm install npm@latest -g
RUN npm install .
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start" ]