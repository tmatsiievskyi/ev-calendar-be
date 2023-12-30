FROM node:21-alpine3.18

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn && yarn cache clean

COPY . .

EXPOSE 4000

CMD ["yarn", "start:dev"]