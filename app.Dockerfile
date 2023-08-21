FROM node:18-alpine AS BUILD_IMAGE

WORKDIR /app

COPY package*.json .

RUN npm ci && npm cache clean --force
COPY . .


FROM node:18-alpine

WORKDIR /app

COPY --from=BUILD_IMAGE /app .

CMD ["npm", "run", "start:docker"]