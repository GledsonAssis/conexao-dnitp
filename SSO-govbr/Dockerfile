FROM node:lts-fermium
LABEL maintainer "Conexao DNIT"

RUN apt-get update && apt-get upgrade -y

RUN mkdir /app
RUN mkdir /app/src
WORKDIR /app

ARG APP_ENV=development
COPY .env.$APP_ENV /app/.env

COPY package.json /app/.
COPY init.sh /app/.
COPY src/ /app/src/

RUN chmod u+x /app/init.sh

RUN npm install

EXPOSE 7003

CMD ["/bin/bash"]
ENTRYPOINT [ "/app/init.sh" ]
