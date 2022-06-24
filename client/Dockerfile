FROM nginx:1.15.9-alpine

COPY nginx.conf /etc/nginx/nginx.conf

RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_11.x  | bash -
RUN apt-get -y install nodejs

Run npm install 

CMD ["npm","run","build"]

COPY dist/hash-pay /usr/share/nginx/html

RUN ls -laR .

EXPOSE 80




