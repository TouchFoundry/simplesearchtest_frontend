# How to use this file (not related to the test, but nice to know :))
# build using :             docker build -t tf/the-gauntlet-service -f Dockerfile .
# run using :               docker run -d -v src:/usr/src/src tf/the-gauntlet-service

FROM node:8.9.4-alpine

RUN npm install -g \
    gulp \
    pm2

RUN mkdir -p /usr/src

WORKDIR /usr/src

COPY package.json /usr/src/

RUN npm install

COPY . /usr/src

RUN gulp

RUN rm -r src docker

WORKDIR /usr/src/dist

EXPOSE 4895
EXPOSE 5858

CMD ["pm2-docker", "process.yml"]