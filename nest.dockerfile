FROM node:20.10.0-alpine as builder
WORKDIR /usr/src/app
COPY package*.json  yarn.lock ./
COPY decorate-angular-cli.js ./
RUN npm install 
COPY . .
RUN npx nx build api 
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
FROM node:20.10.0-alpine
WORKDIR /usr/src/app
COPY package*.json yarn.lock ./
COPY decorate-angular-cli.js ./


ENV POSTGRES_USER=user
ENV POSTGRES_PASSWORD=maTest1234
ENV POSTGRES_DB=milestone-academia
ENV POSTGRES_HOST=localhost
ENV POSTGRES_PORT=5432

ENV JWT_EXPIRES_IN=1800s
ENV JWT_REFRESH_TOKEN_EXPIRES_IN=4h
ENV JWT_ACCESS_TOKEN_KEY=access_token
ENV JWT_SECRET=DO_NOT_USE_THIS_VALUE.INSTEAD_CREATE_A_COMPLEX_SECRET_AND_KEEP_IT_SAFE_OUTSIDE_OF_THE_SOURCE_CODE.

ENV LOGS_FILE_PATH = '/milestone-academia/logs/application-%DATE%.log'
ENV RANDOM_PASSWORD_STRING = '!@#$%&0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN npm install -g pm2@latest
RUN npm install 
RUN npm install express
COPY --from=builder /usr/src/app/dist/apps/api ./build
EXPOSE 3333
ENTRYPOINT ["pm2-runtime","build/main.js"]
