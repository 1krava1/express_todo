### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:8-alpine as builder

COPY package.json package-lock.json app.js ./src ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /todo-app && cp -R ./node_modules ./todo-app
RUN cp -R ./bin ./todo-app

WORKDIR /todo-app

COPY . .


### STAGE 2: Setup ###
FROM node:8-alpine

RUN mkdir /var/www
WORKDIR /var/www

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /todo-app/node_modules /node_modules
COPY --from=builder /todo-app/bin /bin
COPY --from=builder /todo-app/src /src
COPY --from=builder package.json package-lock.json app.js ./

EXPOSE 3000
CMD ["npm", "run", "start-dev"]