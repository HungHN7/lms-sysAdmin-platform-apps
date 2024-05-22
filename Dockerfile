# Build the app
FROM node:18-alpine AS BUILDER

# # Set the working directory
WORKDIR /app

# Copy project specification and dependencies lock files
COPY . ./

RUN npm install -g pnpm

# Set a build argument with a default value
ARG BUILD_ENV=prod
# Set environment variables based on the build argument
ENV BUILD_ENV $BUILD_ENV

RUN pnpm install

RUN pnpm build:$BUILD_ENV

# NGINX
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=BUILDER /app/dist .
COPY nginx.conf /etc/nginx/nginx.conf
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]