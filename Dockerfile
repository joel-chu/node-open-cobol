# docker for node-open-cobol

FROM ubuntu:18.04

USER root

WORKDIR /home/app

# Install deps

RUN apt-get update

RUN apt-get -y install apt-utils
RUN apt-get -y install curl gnupg gcc g++ make
RUN apt-get -y install open-cobol

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get -y install nodejs

# Copy files

COPY ./package.json ./
COPY ./index.js ./
COPY ./http.js ./
COPY lib/ /home/app/lib

RUN npm install

EXPOSE 3001
# Run the HTTP interface
CMD ["node", "http.js"]
