FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --no-immutable 

CMD ["yarn", "dev"]
