ARG BASE_IMAGE
ARG REGISTRY
FROM ${REGISTRY}/node:20-alpine AS build
WORKDIR /app
COPY website/package*.json ./website/
RUN cd website && npm ci
COPY website/ ./website/
COPY devops/docs/ ./devops/docs/
RUN cd website && npm run build

FROM ${BASE_IMAGE}
COPY --from=build /app/website/dist /usr/share/nginx/html
