FROM mhart/alpine-node:base

WORKDIR /app
ADD . /app

CMD node index.js