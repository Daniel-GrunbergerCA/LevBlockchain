FROM node:15.4 as build 


WORKDIR /react-app


COPY package*.json .


RUN npm i


COPY . .


RUN npm run build


FROM nginx:1.19


COPY ./nginx.conf /etc/nginx/nginx.conf


COPY --from=build /react-app/build /usr/share/nginx/html