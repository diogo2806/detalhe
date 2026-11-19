FROM node:24-alpine AS build

WORKDIR /app

COPY package.json ./
RUN npm install --no-audit --no-fund

COPY tsconfig.json tsconfig.app.json tsconfig.node.json vite.config.ts index.html ./
COPY src ./src

RUN npm run build

# Imagem oficial NGINX 1.31.9 (Alpine 3.24; pacote nginx=1.31.9-r1).
# Tags/arquiteturas: https://github.com/docker-library/official-images/blob/master/library/nginx
# Correcoes upstream: https://nginx.org/en/security_advisories.html
FROM nginx:1.31.9-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://127.0.0.1/health || exit 1
