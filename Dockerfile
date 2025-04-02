FROM node:20 AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

FROM node:20-alpine
WORKDIR /app
RUN npm install -g http-server

COPY --from=build /app/dist/task-manager /app/browser

EXPOSE 4200

CMD ["http-server", "browser/browser", "-p", "4200", "--push-state"]
