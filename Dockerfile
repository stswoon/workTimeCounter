FROM node:22.11.0 as builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY src ./src
COPY public ./public
COPY eslint.config.js index.html tsconfig.app.json tsconfig.json tsconfig.node.json vite.config.ts build.helper.mjs .prettierignore ./
RUN npm run build:prod

FROM nginx:1.27.3
COPY --from=builder /app/dist ./usr/share/nginx/html
COPY start.sh /etc/nginx/
RUN chmod +x /etc/nginx/start.sh
ARG NGINX_PORT
EXPOSE $NGINX_PORT
CMD "/etc/nginx/start.sh"