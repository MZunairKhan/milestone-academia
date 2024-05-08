FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

COPY dist/apps/milestone/ .

RUN sed -i '10i \\ttry_files $uri $uri/ /index.html;' /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
