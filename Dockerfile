FROM node:18.15.0-alpine AS builder
WORKDIR .
COPY package*.json ./
COPY . .
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build

FROM node:18.15.0-alpine
WORKDIR .
COPY --from=builder / ./
EXPOSE ${REACT_APP_PORT}
CMD ["pnpm", "start"]
