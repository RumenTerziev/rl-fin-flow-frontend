# Stage 1: Build
FROM node:20 AS build
WORKDIR /rl-fin-flow-frontend

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Build the Angular app
RUN npm run build --prod

# Stage 2: Serve
FROM nginx:alpine

# Copy the build output from the build stage to Nginx's html directory
COPY --from=build /rl-fin-flow-frontend/dist/rl-fin-flow-frontend/browser /usr/share/nginx/html

# Copy custom Nginx configuration
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
