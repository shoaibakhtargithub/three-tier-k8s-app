# ---------- Stage 1: Build ----------
FROM node:18-alpine AS build

WORKDIR /app

# Copy only package files first (better caching)
COPY package*.json ./

# Install only production deps
RUN npm install

# Copy remaining source code
COPY . .

# Build project
RUN npm run build

# ---------- Stage 2: Production ----------
FROM nginx:alpine

# Remove default nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from builder stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
