FROM node:20-alpine AS base
RUN apk update && apk upgrade && apk add --no-cache sqlite

FROM base AS deps
WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .
RUN corepack enable && \
    pnpm i --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable && \
    pnpm build

FROM base AS dist
WORKDIR /app 
COPY --from=builder /app/out ./out
COPY --from=deps /app/node_modules ./node_modules
COPY server.mjs .
COPY package.json .
COPY ./public ./public
COPY ./db ./db
COPY ./knexfile.js .
RUN corepack enable

EXPOSE 3000

CMD ["pnpm","start"]