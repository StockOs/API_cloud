# docker build -t cloudproject ./
# docker run cloudproject

FROM node:14-alpine

# equivalent de cd 
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
