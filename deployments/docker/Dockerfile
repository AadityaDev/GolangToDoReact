FROM nginx:1.15.2-alpine

COPY default.conf /etc/nginx/conf.d/default.conf
COPY build /usr/share/nginx/html
COPY health /usr/share/nginx/html