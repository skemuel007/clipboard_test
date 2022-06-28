FROM node:16.15.0-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
CMD ["npm", "run", "start:dev"]

# FROM dev as test
# COPY test ./
# RUN ["npm", "run", "test"]

FROM dev as prod
LABEL version="1.0" "com.oasis.image"="clipboard"
EXPOSE 3000
CMD ["npm", "run", "seed:start"]