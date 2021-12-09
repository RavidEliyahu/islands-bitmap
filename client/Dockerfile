# base image
FROM node:12-alpine3.12

# set workdir
WORKDIR /app

# copy files
COPY . .

# install the app
RUN npm install

# build the app
RUN npm run build

# start the app
CMD [ "npm", "run", "start" ]