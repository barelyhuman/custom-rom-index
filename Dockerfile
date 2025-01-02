FROM node:20-alpine 

WORKDIR /app 

COPY . .

RUN apk update && apk upgrade
RUN apk add --no-cache sqlite

RUN corepack enable
RUN pnpm i --frozen-lockfile
RUN pnpm build

EXPOSE 3000

CMD ["pnpm","start"]