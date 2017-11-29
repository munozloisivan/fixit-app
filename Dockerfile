FROM node:alpine

# Create app directory
#WORKDIR /usr/src/app
RUN mkdir /fixit
WORKDIR /fixit
# Install app dependencies
COPY package.json /fixit

RUN cd /fixit
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json ./
RUN npm install -g @angular/cli

# If you are building your code for production
# RUN npm install --only=production
RUN npm install

# Bundle app source
COPY . /fixit

RUN ng build

EXPOSE 80 
#CMD [ "npm", "start" ]


