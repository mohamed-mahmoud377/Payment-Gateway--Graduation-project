FROM nginx:1.15.9

COPY nginx.conf /etc/nginx/nginx.conf

COPY package.json .

RUN    apt-get update -yq \
        && apt-get install curl gnupg -yq \
        && curl -sL https://deb.nodesource.com/setup_16.x | bash \
        && apt-get install nodejs -yq

Run npm install

CMD ["npm","run", "build"]

COPY dist/hash-pay /usr/share/nginx/html

#RUN ls -laR .

EXPOSE 80




