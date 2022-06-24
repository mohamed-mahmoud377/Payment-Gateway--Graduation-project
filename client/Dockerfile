FROM node:16

WORKDIR /app

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

#COPY package.json /
#
#RUN cd /app && npm install
#RUN ls && cd .. && ls
#COPY . .
#RUN pwd
#
#RUN ls && pwd && npm run build
#
#COPY nginx.conf ../etc/nginx/nginx.conf
#RUN ls
#RUN cp -r /dist/hash-pay/* ../usr/share/nginx/html
#
#RUN ls -laR .
#
#EXPOSE 80


#WORKDIR /app

COPY package.json .

WORKING_DIR=$(pwd)

RUN npm install
COPY nginx.conf ../etc/nginx/nginx.conf
COPY . .

RUN npm run build
COPY . .

#RUN #ls && cd ../ && ls
RUN pwd  
RUN cp -r $WORKING_DIR/dist/hash-pay/* ../usr/share/nginx/html

