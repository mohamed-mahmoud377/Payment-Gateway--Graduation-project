FROM node:16



#COPY package.json .

#RUN apt-get update -yq \
#        && apt-get install curl gnupg -yq \
#        && curl -sL https://deb.nodesource.com/setup_16.x | bash \
#        && apt-get install nodejs -yq

#COPY . .
#
#CMD ["npm","run", "build"]
RUN apt-get update -y
RUN apt-get install nginx -y
RUN apt-get install curl -y

COPY package.json .

RUN npm install

COPY ./ ./
RUN npm run build
COPY nginx.conf /etc/nginx/nginx.conf
RUN ls
COPY /dist/hash-pay /usr/share/nginx/html

RUN ls -laR .

EXPOSE 80




