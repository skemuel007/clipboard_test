FROM node:16.15.0-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN apk add --no-cache make gcc g++ python3 && \
    npm install && \
    npm rebuild bcrypt --build-from-source && \
    apk del make gcc g++ python3
# https://www.richardkotze.com/top-tips/install-bcrypt-docker-image-exclude-host-node-modules
COPY . ./
CMD ["npm", "run", "start:dev"]

# FROM dev as test
# COPY test ./
# RUN ["npm", "run", "test:cov"]

FROM dev as prod
LABEL version="1.0" "com.oasis.image"="clipboard"
EXPOSE 3000
CMD ["npm", "run", "seed:start"]