FROM node:alpine

WORKDIR /home/src/app

COPY package*.json ./
RUN yarn install

ARG APP_ENV=development
COPY .env.$APP_ENV .env

COPY src ./src
COPY .babelrc ./.babelrc

COPY docker-entrypoint.sh /home/local/bin/
RUN ln -s home/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 7001

CMD [ "yarn", "start", "--no-daemon" ]
