# docker for node-open-cobol

FROM joeljiezhu/ubuntu-1804-armf-cn

USER root 

WORKDIR /home/app

# Install deps 

RUN apt-get update
RUN apt-get -y install curl gnupg 

RUN apt-get -y install open-cobol

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - 
RUN apt-get install nodejs 

# Copy files

COPY ./package.json ./
COPY ./index.js ./
COPY ./http.js ./
COPY ./lib ./

RUN npm install 

EXPOSE 3001
# Run the HTTP interface
CMD ['node', 'http.js']

 

 
