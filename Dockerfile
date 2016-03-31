FROM node:4.2.1

ADD . /app

WORKDIR /app

RUN npm install

CMD ["npm","run","test"]