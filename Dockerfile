FROM node:20 as build
WORKDIR /rl-fin-flow-frontend
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start-prod"]