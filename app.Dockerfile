FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY prisma ./prisma
COPY doc ./doc

RUN npm install

RUN npx prisma generate

COPY . .

CMD ["npm", "run", "start:docker"]
