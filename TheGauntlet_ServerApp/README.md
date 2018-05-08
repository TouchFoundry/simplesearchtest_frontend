# TF SimpleSearchTest Service #

Micro-service that provides test results for the Client App

### What is this repository for? ###

* NodeJS (written in TypeScript) micro-service
* 1.0.0

### Features ###

* Sub-module compatible 
* Winston logger setup
* Very Object Orientated and Promise based
* Includes a HealthCheck route, used in deployment strategies, specifically AWS ELB.
* Dockerfile for development & deployment
* docker-compose file for easy testing. Look for the `DockerBuildDockerComposeUp.sh` file. Running this file will build the stack and deploy a Docker Service

### Tech Stack ###

* Docker used to contain dependencies and tooling
* `node` >= 6.9.1
* `npm` >= 3.10.3 
* TypeScript >= 2.1.0
* uses `bluebird` >= 3.5.0 for promises

### How do I get set up? (local development environment) ###

* Clone
* `npm install` so that your IDE has the definitions for the dependencies
* `DockerBuildDockerComposeUp.sh` will build the docker image & run use docker-compose to host it locally. Alternatively, you could just run `docker-compose up -d`. **Note: This only spins up the backend server, you need to work out your own way to locally host your ClientApp** 

### Who do I talk to? ###

* Luke Johnstone [TouchFoundry]