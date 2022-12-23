# Build app
FROM node:18-slim

WORKDIR /build
COPY . .
RUN npm install
RUN npm run build

# Serve using nginx (port 80)
FROM nginx

COPY --from=0 /build/dist /usr/share/nginx/html