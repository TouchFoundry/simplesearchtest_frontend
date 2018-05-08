#!/usr/bin/env bash

#RUN ME!!!! :) this will spin up the server

cd ..

docker build -t tf/simple-search-test-service -f Dockerfile .

docker-compose up -d

osascript -e 'display notification "Image built and is now running" with title "Build Complete" sound name "Glass"'