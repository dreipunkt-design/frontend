FROM node:16-alpine

RUN mkdir -p /usr/app/frontend

WORKDIR /usr/app/app/frontend

COPY ./ ./

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
