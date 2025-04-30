FROM node:22-alpine

RUN npm install -g pnpm 

WORKDIR /user/src/app

COPY ./packages ./packages
COPY ./package.json ./package.json
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml
COPY ./pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY ./turbo.json ./turbo.json

COPY ./apps/ws ./apps/ws

RUN pnpm install 
RUN pnpm run db:generate
RUN pnpm run build

EXPOSE 8081

CMD ["pnpm", "run", "start:ws"]


