FROM node:alpine

# Create app directory
#WORKDIR /usr/src/app
RUN mkdir /Client
WORKDIR /Client
# Install app dependencies
COPY package.json /Client

RUN cd /Client
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json ./
RUN npm install -g @angular/cli
RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . /Client

EXPOSE 8080
#CMD [ "npm", "start" ]


