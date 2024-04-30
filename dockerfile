FROM node:20.10.0-alpine as builder


WORKDIR /app

COPY package*.json yarn.lock  ./
COPY decorate-angular-cli.js /app

RUN  npm install  
# RUN yarn add nx@18.3.4

COPY . .
RUN npx nx build milestone 
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist/apps/milestone ./
RUN sed -i '10i \\ttry_files $uri $uri/ /index.html;' /etc/nginx/conf.d/default.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]










# # WORKDIR /app

# # COPY package*.json ./

# # RUN npm install

# # COPY . .

# # RUN npm install nx@18.3.4

# # RUN npx nx build milestone --prod

# FROM nginx:stable-alpine

# # WORKDIR /usr/share/nginx/html

# # RUN rm -rf ./*

# COPY src/milestone /usr/share/nginx/html

# EXPOSE 80

# CMD ["ng", "serve", "--host", "0.0.0.0"]
