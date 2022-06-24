FROM nginx:1.15.9-alpine

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

COPY dist/hash-pay .
RUN ls -laR .
EXPOSE 80
