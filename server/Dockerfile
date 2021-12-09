# base image
FROM node:12-alpine3.12

# set workdir
WORKDIR /app

# copy files
COPY . .

# install the app
RUN npm install

# start the app
CMD [ "npm", "run", "start" ]