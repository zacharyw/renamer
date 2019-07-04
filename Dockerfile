FROM node:10.15.3

RUN apt-get update -qq

# Get the latest stable release of yarn
RUN yarn policies set-version

RUN mkdir /nuxtapp

WORKDIR /nuxtapp

COPY package.json /nuxtapp
COPY yarn.lock /nuxtapp

ARG SSH_PRIVATE_KEY
RUN mkdir /root/.ssh/
RUN echo "${SSH_PRIVATE_KEY}" > /root/.ssh/id_rsa

RUN yarn

COPY . /nuxtapp

EXPOSE 3000
