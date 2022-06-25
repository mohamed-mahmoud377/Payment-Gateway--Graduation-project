FROM nginx:1.15.9

WORKDIR /app

RUN apt-get update -yq \
        && apt-get install curl gnupg -yq \
        && curl -sL https://deb.nodesource.com/setup_16.x | bash \
        && apt-get install nodejs -yq

COPY package.json .

RUN npm install
COPY nginx.conf ../etc/nginx/nginx.conf
COPY . .

RUN npm run build

RUN cp -r /app/dist/hash-pay/* /usr/share/nginx/html

EXPOSE 80

